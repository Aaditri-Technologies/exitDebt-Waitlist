"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";

interface WaitlistEntry {
    id: number;
    name: string;
    mobile: string;
    place: string;
    state: string;
    total_debt: string;
    archived: boolean;
    created_at: string;
}

export default function AdminWaitlistPage() {
    const [secret, setSecret] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [data, setData] = useState<WaitlistEntry[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ── Tabs ──
    const [activeTab, setActiveTab] = useState<"active" | "archived">("active");

    // ── Filter State ──
    const [filterPlace, setFilterPlace] = useState("");
    const [filterDebtMin, setFilterDebtMin] = useState("");
    const [filterDebtMax, setFilterDebtMax] = useState("");

    // ── Delete Confirmation ──
    const [deleteTarget, setDeleteTarget] = useState<WaitlistEntry | null>(null);
    const [actionLoading, setActionLoading] = useState<number | null>(null);

    // Use a ref to always have the latest secret available
    const secretRef = React.useRef(secret);
    secretRef.current = secret;

    const fetchData = useCallback(async (adminSecret: string) => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/admin/waitlist", {
                headers: { "x-admin-secret": adminSecret },
            });
            const json = await res.json();

            if (json.success) {
                setData(json.data);
                setCount(json.count);
                setAuthenticated(true);
                // Persist secret in sessionStorage for page refreshes
                sessionStorage.setItem("admin_secret", adminSecret);
            } else {
                setError(json.error || "Failed to authenticate.");
                setAuthenticated(false);
                sessionStorage.removeItem("admin_secret");
            }
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Auto-login from sessionStorage on mount
    useEffect(() => {
        const saved = sessionStorage.getItem("admin_secret");
        if (saved) {
            setSecret(saved);
            fetchData(saved);
        }
    }, [fetchData]);

    function handleAuth(e: React.FormEvent) {
        e.preventDefault();
        if (secret.trim()) {
            fetchData(secret.trim());
        }
    }

    // Auto-refresh every 30 seconds
    useEffect(() => {
        if (!authenticated || !secret) return;
        const interval = setInterval(() => fetchData(secret), 30000);
        return () => clearInterval(interval);
    }, [authenticated, secret, fetchData]);

    // ── Actions ──
    async function handleArchive(id: number, archive: boolean) {
        const currentSecret = secretRef.current;
        if (!currentSecret) return;
        setActionLoading(id);
        try {
            const res = await fetch("/api/admin/waitlist", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-secret": currentSecret,
                },
                body: JSON.stringify({ id, archived: archive }),
            });
            const json = await res.json();
            if (json.success) {
                await fetchData(currentSecret);
            } else {
                alert(json.error || "Failed to update entry.");
            }
        } catch {
            alert("Network error. Please try again.");
        } finally {
            setActionLoading(null);
        }
    }

    async function handleDelete(id: number) {
        const currentSecret = secretRef.current;
        if (!currentSecret) return;
        setActionLoading(id);
        try {
            const res = await fetch("/api/admin/waitlist", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-secret": currentSecret,
                },
                body: JSON.stringify({ id }),
            });
            const json = await res.json();
            if (json.success) {
                setDeleteTarget(null);
                await fetchData(currentSecret);
            } else {
                alert(json.error || "Failed to delete entry.");
            }
        } catch {
            alert("Network error. Please try again.");
        } finally {
            setActionLoading(null);
        }
    }


    // ── Derived data ──
    const activeEntries = useMemo(() => data.filter((d) => !d.archived), [data]);
    const archivedEntries = useMemo(() => data.filter((d) => d.archived), [data]);
    const currentEntries = activeTab === "active" ? activeEntries : archivedEntries;

    const uniquePlaces = useMemo(() => {
        const set = new Set(currentEntries.map((d) => d.place));
        return Array.from(set).sort();
    }, [currentEntries]);


    const filteredData = useMemo(() => {
        return currentEntries.filter((entry) => {
            if (filterPlace && entry.place.toLowerCase() !== filterPlace.toLowerCase()) return false;
            const debt = Number(entry.total_debt);
            if (filterDebtMin && debt < Number(filterDebtMin)) return false;
            if (filterDebtMax && debt > Number(filterDebtMax)) return false;
            return true;
        });
    }, [currentEntries, filterPlace, filterDebtMin, filterDebtMax]);

    const hasActiveFilters = filterPlace || filterDebtMin || filterDebtMax;

    function clearFilters() {
        setFilterPlace("");
        setFilterDebtMin("");
        setFilterDebtMax("");
    }

    // ── Formatters ──
    function formatDate(dateStr: string) {
        return new Date(dateStr).toLocaleString("en-IN", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit",
        });
    }

    function formatDebt(value: string) {
        const num = Number(value);
        return new Intl.NumberFormat("en-IN", {
            style: "currency", currency: "INR", maximumFractionDigits: 0,
        }).format(num);
    }

    // ── Print ──
    function handlePrint() {
        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const rows = filteredData
            .map(
                (e, i) => `
            <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${i + 1}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:500;">${e.name}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${e.mobile}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${e.place}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:500;">${formatDebt(e.total_debt)}</td>
                <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:12px;">${formatDate(e.created_at)}</td>
            </tr>`
            )
            .join("");

        const totalDebt = filteredData.reduce((sum, e) => sum + Number(e.total_debt), 0);
        const filterSummary = [];
        if (filterPlace) filterSummary.push(`Place: ${filterPlace}`);
        if (filterDebtMin) filterSummary.push(`Min Debt: ₹${Number(filterDebtMin).toLocaleString("en-IN")}`);
        if (filterDebtMax) filterSummary.push(`Max Debt: ₹${Number(filterDebtMax).toLocaleString("en-IN")}`);

        printWindow.document.write(`<!DOCTYPE html><html><head><title>ExitDebt Waitlist</title>
            <style>body{font-family:'Inter',system-ui,sans-serif;color:#1a1a2e;margin:40px}h1{font-size:20px;margin-bottom:4px}.meta{font-size:13px;color:#6b7280;margin-bottom:20px}.filters{font-size:12px;color:#7300BE;margin-bottom:16px}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:left;padding:10px 12px;border-bottom:2px solid #1a1a2e;font-weight:600;font-size:12px}th.right{text-align:right}.summary{margin-top:16px;font-size:13px;font-weight:600;text-align:right}@media print{body{margin:20px}}</style></head><body>
            <h1>ExitDebt — Waitlist (${activeTab === "active" ? "Active" : "Archived"})</h1>
            <p class="meta">Printed on ${new Date().toLocaleString("en-IN")} · ${filteredData.length} entries</p>
            ${filterSummary.length > 0 ? `<p class="filters">Filters: ${filterSummary.join(" · ")}</p>` : ""}
            <table><thead><tr><th>#</th><th>Name</th><th>Mobile</th><th>Place</th><th class="right">Total Debt</th><th>Submitted</th></tr></thead><tbody>${rows}</tbody></table>
            <p class="summary">Total Debt: ${formatDebt(String(totalDebt))}</p></body></html>`);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    // ── Styles ──
    const tabStyle = (isActive: boolean) => ({
        backgroundColor: isActive ? "var(--color-purple)" : "transparent",
        color: isActive ? "#fff" : "var(--color-text-secondary)",
        border: isActive ? "none" : "1px solid var(--color-border)",
    });

    return (
        <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg)" }}>
            <Navbar />

            <main className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
                <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>
                    Waitlist Admin
                </h1>
                <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
                    View and manage waitlist submissions.
                </p>

                {!authenticated ? (
                    /* ── Auth Form ── */
                    <div className="max-w-sm">
                        <div
                            className="rounded-2xl p-7"
                            style={{
                                backgroundColor: "var(--color-bg-card)",
                                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <form onSubmit={handleAuth} className="space-y-4">
                                <div>
                                    <label htmlFor="secret" className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-text-secondary)" }}>
                                        Admin Secret
                                    </label>
                                    <input
                                        id="secret"
                                        type="password"
                                        value={secret}
                                        onChange={(e) => setSecret(e.target.value)}
                                        placeholder="Enter admin secret"
                                        className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                                        style={{
                                            backgroundColor: "var(--color-bg-soft)",
                                            border: "1px solid var(--color-border)",
                                            color: "var(--color-text-primary)",
                                        }}
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm" style={{ color: "var(--color-danger)" }}>{error}</p>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
                                    style={{ backgroundColor: "var(--color-purple)" }}
                                >
                                    {loading ? "Verifying..." : "Access Dashboard"}
                                </button>
                            </form>
                        </div>
                    </div>
                ) : (
                    /* ── Dashboard ── */
                    <div>
                        {/* ── Tabs ── */}
                        <div className="flex items-center gap-2 mb-6">
                            <button
                                onClick={() => setActiveTab("active")}
                                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                                style={tabStyle(activeTab === "active")}
                            >
                                Active ({activeEntries.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("archived")}
                                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer"
                                style={tabStyle(activeTab === "archived")}
                            >
                                Archived ({archivedEntries.length})
                            </button>

                            <div className="ml-auto flex items-center gap-3">
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 cursor-pointer"
                                    style={{
                                        backgroundColor: "var(--color-bg-soft)",
                                        border: "1px solid var(--color-border)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5z" />
                                    </svg>
                                    Print
                                </button>
                                <button
                                    onClick={() => fetchData(secret)}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90 cursor-pointer"
                                    style={{
                                        backgroundColor: "var(--color-bg-soft)",
                                        border: "1px solid var(--color-border)",
                                        color: "var(--color-text-primary)",
                                    }}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.992 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M21.015 4.356v4.992" />
                                    </svg>
                                    Refresh
                                </button>
                            </div>
                        </div>

                        {/* ── Filter Bar ── */}
                        <div
                            className="rounded-xl p-4 mb-6"
                            style={{
                                backgroundColor: "var(--color-bg-card)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                                    Filters
                                </p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="text-xs cursor-pointer hover:underline" style={{ color: "var(--color-danger)" }}>
                                        Clear all
                                    </button>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-muted)" }}>Place (City)</label>
                                    <select
                                        value={filterPlace}
                                        onChange={(e) => setFilterPlace(e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 cursor-pointer"
                                        style={{ backgroundColor: "var(--color-bg-soft)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                                    >
                                        <option value="">All Places</option>
                                        {uniquePlaces.map((p) => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-muted)" }}>Min Debt (₹)</label>
                                    <input type="number" value={filterDebtMin} onChange={(e) => setFilterDebtMin(e.target.value)} placeholder="e.g. 100000"
                                        className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: "var(--color-bg-soft)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: "var(--color-text-muted)" }}>Max Debt (₹)</label>
                                    <input type="number" value={filterDebtMax} onChange={(e) => setFilterDebtMax(e.target.value)} placeholder="e.g. 5000000"
                                        className="w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2"
                                        style={{ backgroundColor: "var(--color-bg-soft)", border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ── Showing count ── */}
                        <p className="text-sm mb-3" style={{ color: "var(--color-text-secondary)" }}>
                            Showing{" "}
                            <span className="font-semibold" style={{ color: "var(--color-purple)" }}>{filteredData.length}</span>
                            {filteredData.length !== currentEntries.length && <span> of {currentEntries.length}</span>}
                            {" "}{activeTab === "active" ? "active" : "archived"} submissions
                        </p>

                        {/* ── Data Table ── */}
                        <div
                            className="overflow-x-auto rounded-xl"
                            style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)" }}
                        >
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                                        {["#", "Name", "Mobile", "Place"].map((h) => (
                                            <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text-secondary)" }}>{h}</th>
                                        ))}
                                        <th className="text-right px-4 py-3 font-semibold" style={{ color: "var(--color-text-secondary)" }}>Total Debt</th>
                                        <th className="text-left px-4 py-3 font-semibold" style={{ color: "var(--color-text-secondary)" }}>Submitted</th>
                                        <th className="text-center px-4 py-3 font-semibold" style={{ color: "var(--color-text-secondary)" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="text-center py-10" style={{ color: "var(--color-text-muted)" }}>
                                                {hasActiveFilters
                                                    ? "No submissions match the selected filters."
                                                    : activeTab === "archived"
                                                        ? "No archived submissions."
                                                        : "No submissions yet."}
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map((entry, idx) => (
                                            <tr
                                                key={entry.id}
                                                className="transition-colors hover:bg-gray-50"
                                                style={{ borderBottom: "1px solid var(--color-border)" }}
                                            >
                                                <td className="px-4 py-3" style={{ color: "var(--color-text-muted)" }}>{idx + 1}</td>
                                                <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-primary)" }}>{entry.name}</td>
                                                <td className="px-4 py-3" style={{ color: "var(--color-text-secondary)" }}>{entry.mobile}</td>
                                                <td className="px-4 py-3" style={{ color: "var(--color-text-secondary)" }}>{entry.place}</td>
                                                <td className="px-4 py-3 font-medium text-right" style={{ color: "var(--color-success)" }}>
                                                    {formatDebt(entry.total_debt)}
                                                </td>
                                                <td className="px-4 py-3 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                                    {formatDate(entry.created_at)}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        {activeTab === "active" ? (
                                                            <button
                                                                onClick={() => handleArchive(entry.id, true)}
                                                                disabled={actionLoading === entry.id}
                                                                title="Archive"
                                                                className="p-1.5 rounded-md transition-all hover:bg-gray-100 cursor-pointer disabled:opacity-40"
                                                                style={{ color: "var(--color-text-muted)" }}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                                                </svg>
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleArchive(entry.id, false)}
                                                                disabled={actionLoading === entry.id}
                                                                title="Restore"
                                                                className="p-1.5 rounded-md transition-all hover:bg-gray-100 cursor-pointer disabled:opacity-40"
                                                                style={{ color: "var(--color-success)" }}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => setDeleteTarget(entry)}
                                                            disabled={actionLoading === entry.id}
                                                            title="Delete permanently"
                                                            className="p-1.5 rounded-md transition-all hover:bg-red-50 cursor-pointer disabled:opacity-40"
                                                            style={{ color: "var(--color-danger)" }}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ── Summary Footer ── */}
                        {filteredData.length > 0 && (
                            <div
                                className="flex items-center justify-between mt-3 px-4 py-3 rounded-xl text-sm"
                                style={{ backgroundColor: "var(--color-bg-soft)", border: "1px solid var(--color-border)" }}
                            >
                                <span style={{ color: "var(--color-text-muted)" }}>{filteredData.length} entries</span>
                                <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                                    Total Debt:{" "}
                                    <span style={{ color: "var(--color-success)" }}>
                                        {formatDebt(String(filteredData.reduce((sum, e) => sum + Number(e.total_debt), 0)))}
                                    </span>
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* ── Delete Confirmation Modal ── */}
            {deleteTarget && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    onClick={() => setDeleteTarget(null)}
                >
                    <div
                        className="rounded-2xl p-6 max-w-sm w-full animate-slideUp"
                        style={{
                            backgroundColor: "var(--color-bg-card)",
                            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: "rgba(220,38,38,0.1)" }}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: "var(--color-danger)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-bold" style={{ color: "var(--color-text-primary)" }}>Delete Entry?</h3>
                                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>This action cannot be undone.</p>
                            </div>
                        </div>

                        <div
                            className="rounded-lg p-3 mb-5 text-sm"
                            style={{ backgroundColor: "var(--color-bg-soft)", border: "1px solid var(--color-border)" }}
                        >
                            <p className="font-medium" style={{ color: "var(--color-text-primary)" }}>{deleteTarget.name}</p>
                            <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                {deleteTarget.mobile} · {deleteTarget.place} · {formatDebt(deleteTarget.total_debt)}
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeleteTarget(null)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                                style={{
                                    backgroundColor: "var(--color-bg-soft)",
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-text-primary)",
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteTarget.id)}
                                disabled={actionLoading === deleteTarget.id}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer disabled:opacity-50"
                                style={{ backgroundColor: "var(--color-danger)" }}
                            >
                                {actionLoading === deleteTarget.id ? "Deleting..." : "Delete Forever"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
