import countries from "world-countries";

const countriesFormatted = countries.map((country) => ({
	value: country.cca2,
	label: country.name.common,
	flag: country.flag,
	latlng: country.latlng,
	region: country.region,
}));

export const useCountries = () => {
	const getAllCountries = countriesFormatted;
	const getCountryByValue = (value: string) => {
		return countriesFormatted.find((country) => country.label === value);
	};
	return { getAllCountries, getCountryByValue };
};
