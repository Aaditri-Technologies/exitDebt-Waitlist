/**
 * Indian city-to-state mapping.
 * Used to auto-detect state from the city/place entered by the user.
 * Only major cities are listed — returns "Other" for unknown cities.
 */

const CITY_STATE_MAP: Record<string, string> = {
    // Maharashtra
    mumbai: "Maharashtra",
    pune: "Maharashtra",
    nagpur: "Maharashtra",
    thane: "Maharashtra",
    nashik: "Maharashtra",
    aurangabad: "Maharashtra",
    solapur: "Maharashtra",
    kolhapur: "Maharashtra",
    navi_mumbai: "Maharashtra",
    "navi mumbai": "Maharashtra",

    // Delhi NCR
    delhi: "Delhi",
    "new delhi": "Delhi",
    noida: "Uttar Pradesh",
    "greater noida": "Uttar Pradesh",
    gurgaon: "Haryana",
    gurugram: "Haryana",
    faridabad: "Haryana",
    ghaziabad: "Uttar Pradesh",

    // Karnataka
    bangalore: "Karnataka",
    bengaluru: "Karnataka",
    mysore: "Karnataka",
    mysuru: "Karnataka",
    hubli: "Karnataka",
    mangalore: "Karnataka",
    mangaluru: "Karnataka",
    belgaum: "Karnataka",
    belagavi: "Karnataka",

    // Tamil Nadu
    chennai: "Tamil Nadu",
    coimbatore: "Tamil Nadu",
    madurai: "Tamil Nadu",
    tiruchirappalli: "Tamil Nadu",
    trichy: "Tamil Nadu",
    salem: "Tamil Nadu",
    tiruppur: "Tamil Nadu",
    vellore: "Tamil Nadu",

    // Telangana
    hyderabad: "Telangana",
    secunderabad: "Telangana",
    warangal: "Telangana",

    // Andhra Pradesh
    visakhapatnam: "Andhra Pradesh",
    vizag: "Andhra Pradesh",
    vijayawada: "Andhra Pradesh",
    tirupati: "Andhra Pradesh",
    guntur: "Andhra Pradesh",
    nellore: "Andhra Pradesh",

    // Gujarat
    ahmedabad: "Gujarat",
    surat: "Gujarat",
    vadodara: "Gujarat",
    rajkot: "Gujarat",
    gandhinagar: "Gujarat",
    bhavnagar: "Gujarat",

    // West Bengal
    kolkata: "West Bengal",
    howrah: "West Bengal",
    durgapur: "West Bengal",
    siliguri: "West Bengal",
    asansol: "West Bengal",

    // Rajasthan
    jaipur: "Rajasthan",
    jodhpur: "Rajasthan",
    udaipur: "Rajasthan",
    kota: "Rajasthan",
    ajmer: "Rajasthan",
    bikaner: "Rajasthan",

    // Uttar Pradesh
    lucknow: "Uttar Pradesh",
    kanpur: "Uttar Pradesh",
    agra: "Uttar Pradesh",
    varanasi: "Uttar Pradesh",
    prayagraj: "Uttar Pradesh",
    allahabad: "Uttar Pradesh",
    meerut: "Uttar Pradesh",
    bareilly: "Uttar Pradesh",

    // Madhya Pradesh
    bhopal: "Madhya Pradesh",
    indore: "Madhya Pradesh",
    jabalpur: "Madhya Pradesh",
    gwalior: "Madhya Pradesh",

    // Kerala
    kochi: "Kerala",
    cochin: "Kerala",
    thiruvananthapuram: "Kerala",
    trivandrum: "Kerala",
    kozhikode: "Kerala",
    calicut: "Kerala",
    thrissur: "Kerala",

    // Punjab
    chandigarh: "Chandigarh",
    ludhiana: "Punjab",
    amritsar: "Punjab",
    jalandhar: "Punjab",
    patiala: "Punjab",

    // Haryana
    karnal: "Haryana",
    panipat: "Haryana",
    hisar: "Haryana",
    rohtak: "Haryana",
    ambala: "Haryana",

    // Bihar
    patna: "Bihar",
    gaya: "Bihar",
    muzaffarpur: "Bihar",
    bhagalpur: "Bihar",

    // Odisha
    bhubaneswar: "Odisha",
    cuttack: "Odisha",
    rourkela: "Odisha",

    // Jharkhand
    ranchi: "Jharkhand",
    jamshedpur: "Jharkhand",
    dhanbad: "Jharkhand",
    bokaro: "Jharkhand",

    // Chhattisgarh
    raipur: "Chhattisgarh",
    bilaspur: "Chhattisgarh",
    bhilai: "Chhattisgarh",

    // Assam
    guwahati: "Assam",
    silchar: "Assam",
    dibrugarh: "Assam",

    // Goa
    panaji: "Goa",
    margao: "Goa",
    vasco: "Goa",

    // Uttarakhand
    dehradun: "Uttarakhand",
    haridwar: "Uttarakhand",
    rishikesh: "Uttarakhand",

    // Himachal Pradesh
    shimla: "Himachal Pradesh",
    manali: "Himachal Pradesh",
    dharamshala: "Himachal Pradesh",

    // J&K
    srinagar: "Jammu & Kashmir",
    jammu: "Jammu & Kashmir",

    // Northeast
    imphal: "Manipur",
    shillong: "Meghalaya",
    aizawl: "Mizoram",
    kohima: "Nagaland",
    agartala: "Tripura",
    itanagar: "Arunachal Pradesh",
    gangtok: "Sikkim",
};

/**
 * Get the Indian state for a given city name.
 * Case-insensitive. Returns "Other" if not found.
 */
export function getStateFromCity(city: string): string {
    const normalized = city.toLowerCase().trim();
    return CITY_STATE_MAP[normalized] || "Other";
}

/**
 * Get all unique states from the mapping.
 */
export function getAllStates(): string[] {
    const states = new Set(Object.values(CITY_STATE_MAP));
    return Array.from(states).sort();
}
