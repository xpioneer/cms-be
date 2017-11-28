import GeoIp2 from 'geoip2';
import R from 'ramda';
const _DEV_ = process.env.NODE_ENV === "development";
GeoIp2.init();
const getGeo = (ip) => {
    if(_DEV_) {
        return new Promise((resolve, reject) => {
            resolve({
                continent: {names:{}},
                country: {names:{}},
                subdivisions: [{names:{}}],
                city: {names:{}},
                location: {
                    accuracy_radius: null,
                    latitude: null,
                    longitude: null,
                    metro_code: null,
                    time_zone: null,
                },
            });
        });
    }
    return new Promise((resolve, reject) => {
        GeoIp2.lookup(ip, function(error, result) {
            if (error) {
                reject(error);
            }
            if (result) {
                resolve(result);
            }
        });
    });
};

class GeoIp {

    static async getGeoInfo (ip) {
        const result = await getGeo(ip);
        const continent = {
            code: result.continent['code'],
            geoname_id: result.continent['geoname_id'],
            name_en: result.continent['names']['en'],
            name_zh: result.continent['names']['zh-CN'] || '',
        };
        const country = {
            iso_code: result.country['iso_code'],
            geoname_id: result.country['geoname_id'],
            name_en: result.country['names']['en'],
            name_zh: result.country['names']['zh-CN'] || '',
        };
        const subdivisions = {
            iso_code: result.subdivisions['iso_code'],
            geoname_id: result.subdivisions['geoname_id'],
            name_en: result.subdivisions[0]['names']['en'],
            name_zh: result.subdivisions[0]['names']['zh-CN'] || '',
        };
        const city = {
            geoname_id: result.city['geoname_id'],
            name_en: result.city['names']['en'],
            name_zh: result.city['names']['zh-CN'] || '',
        };
        const location = result.location;
        return {
            continent,
            country,
            subdivisions,
            city,
            location
        };
    }

    static async getModelGeoInfo (ip) {
        const result = await getGeo(ip);
        let model = {
            continent_code: result.continent['code'],
            continent_geoname_id: result.continent['geoname_id'],
            continent_name_en: result.continent['names']['en'],
            continent_name_zh: result.continent['names']['zh-CN'] || '',
            country_iso_code: result.country['iso_code'],
            country_geoname_id: result.country['geoname_id'],
            country_name_en: result.country['names']['en'],
            country_name_zh: result.country['names']['zh-CN'] || '',
            subdivisions_iso_code: result.subdivisions['iso_code'],
            subdivisions_geoname_id: result.subdivisions['geoname_id'],
            subdivisions_name_en: result.subdivisions[0]['names']['en'],
            subdivisions_name_zh: result.subdivisions[0]['names']['zh-CN'] || '',
            city_geoname_id: result.city['geoname_id'],
            city_name_en: result.city['names']['en'],
            city_name_zh: result.city['names']['zh-CN'] || '',
        };
        model = R.mergeWith(R.concat, model, result.location);
        return model;
    }
}

export default GeoIp;
