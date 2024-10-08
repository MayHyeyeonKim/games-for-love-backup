/**
 *  mappingService.ts
 *
 *  types, classes that support the mapping example
 * 
 *  @copyright 2024 Digital Aid Seattle
 *
 */

import { airtableService } from "../../mapping/airtableService";
import { Location } from "../../models/location";
import { TeamMember } from "../../models/teamMember";

const LOCATIONS: Location[] = [
    { name: "Bellevue, WA United States", "latitude": 47.6101, "longitude": -122.2015 },
    { name: "Bellevue, WA", "latitude": 47.6101, "longitude": -122.2015 },
    { name: "Bellingham, WA, USA", "latitude": 48.7519, "longitude": -122.4787 },
    { name: "Bothell, WA", "latitude": 47.7601, "longitude": -122.2054 },
    { name: "Bothell,WA,USA", "latitude": 47.7601, "longitude": -122.2054 },
    { name: "Everett, WA, USA", "latitude": 47.9790, "longitude": -122.2021 },
    { name: "Gig Harbor, Washington", "latitude": 47.3293, "longitude": -122.5801 },
    { name: "Kent, WA", "latitude": 47.3831, "longitude": -122.2348 },
    { name: "Kirkland, WA", "latitude": 47.6769, "longitude": -122.2060 },
    { name: "Lubbock, TX", "latitude": 33.5778, "longitude": -101.8553 },
    { name: "Lynnwood", "latitude": 47.8209, "longitude": -122.3151 },
    { name: "Lynnwood, WA 98087", "latitude": 47.8209, "longitude": -122.3151 },
    { name: "Mission Viejo, California, USA", "latitude": 33.5969, "longitude": -117.6582 },
    { name: "Montreal, Canada", "latitude": 45.5019, "longitude": -73.5674 },
    { name: "Mountain View, CA", "latitude": 37.3861, "longitude": -122.0839 },
    { name: "New York City, NY, USA", "latitude": 40.6643, "longitude": -73.9385 },
    { name: "Portland, OR", "latitude": 45.5152, "longitude": -122.6784 },
    { name: "Redmond, WA", "latitude": 47.6740, "longitude": -122.1215 },
    { name: "Redmond, WA, USA", "latitude": 47.6740, "longitude": -122.1215 },
    { name: "Redmond, Washington", "latitude": 47.6740, "longitude": -122.1215 },
    { name: "San Francisco, CA, USA", "latitude": 37.7749, "longitude": -122.4194 },
    { name: "Seattle", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, WA", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, WA, USA", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, Wa", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, Washington USA", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, Washington", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle, Washington, USA", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Seattle,Washington", "latitude": 47.6205, "longitude": -122.3509 },
    { name: "Washington, DC", "latitude": 38.9072, "longitude": -77.0369 },
    { name: "Woodinville", "latitude": 47.7543, "longitude": -122.1635 }
]

class MappingService {

    async getLocations(): Promise<Location[]> {
        // TODO externalize in supabase.storage
        return LOCATIONS;
    }

    async getPeople(): Promise<TeamMember[]> {
        const TABLE = import.meta.env.VITE_AIRTABLE_TABLE_PEOPLE_REFERENCE;
        const MAX_RECORDS = 100;
        const FILTER = `{Manual Status} = "${'ongoing'}"`

        return airtableService.getTableRecords(TABLE, MAX_RECORDS, FILTER)
            .then(records => records.map(r => {
                const pics = r.fields.pic as any[];
                return {
                    name: `${r.fields['First name']} ${r.fields["Last name"]}`,
                    role: r.fields["Position"],
                    url: pics && pics[0] && pics[0].thumbnails.large.url || undefined,
                    location: r.fields["Location"]
                } as TeamMember
            }));
    }

    // Many names for the same lat-long (e.g.  "Seattle", "Seattle, WA", "Seattle, WA, USA")
    unique(locations: Location[]): Location[] {
        let unique = locations
            .reduce((arr: Location[], b: Location) => {
                if (!arr.find(test => test.longitude === b.longitude && test.latitude === b.latitude)) {
                    arr.push(b);
                }
                return arr;
            }, []);
        return unique;
    }

    // Given a location, find all people with the same lat-long  (that's why we need all locations)
    getPeopleAt(people: TeamMember[], locations: Location[], location: Location): TeamMember[] {
        return people.filter(p => {
            const match = locations.find(l => l.name === p.location);
            return match && match.latitude === location.latitude && match.longitude === location.longitude;
        })
    }
}

const mappingService = new MappingService();
export { mappingService };
export type { Location, TeamMember };
