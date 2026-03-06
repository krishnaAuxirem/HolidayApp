export type LatLngTuple = [number, number];

export interface AttractionPoint {
  name: string;
  position: LatLngTuple;
}

export interface DestinationGeo {
  center: LatLngTuple;
  attractions: AttractionPoint[];
  route: LatLngTuple[];
}

export const destinationGeoMap: Record<string, DestinationGeo> = {
  'dest-1': {
    center: [36.3932, 25.4615],
    attractions: [
      { name: 'Oia Sunset Point', position: [36.4618, 25.3753] },
      { name: 'Red Beach', position: [36.3512, 25.3972] },
      { name: 'Ancient Thera', position: [36.3597, 25.4765] },
    ],
    route: [
      [36.3932, 25.4615],
      [36.4618, 25.3753],
      [36.3512, 25.3972],
      [36.3597, 25.4765],
    ],
  },
  'dest-2': {
    center: [-8.4095, 115.1889],
    attractions: [
      { name: 'Tanah Lot Temple', position: [-8.6212, 115.087] },
      { name: 'Ubud Rice Terraces', position: [-8.4311, 115.2797] },
      { name: 'Monkey Forest', position: [-8.5191, 115.2617] },
    ],
    route: [
      [-8.4095, 115.1889],
      [-8.4311, 115.2797],
      [-8.5191, 115.2617],
      [-8.6212, 115.087],
    ],
  },
  'dest-3': {
    center: [3.2028, 73.2207],
    attractions: [
      { name: 'Male City', position: [4.1755, 73.5093] },
      { name: 'Maafushi Reef', position: [3.9423, 73.4907] },
      { name: 'Banana Reef', position: [4.2712, 73.5461] },
    ],
    route: [
      [3.2028, 73.2207],
      [4.1755, 73.5093],
      [4.2712, 73.5461],
      [3.9423, 73.4907],
    ],
  },
  'dest-4': {
    center: [48.8566, 2.3522],
    attractions: [
      { name: 'Eiffel Tower', position: [48.8584, 2.2945] },
      { name: 'Louvre Museum', position: [48.8606, 2.3376] },
      { name: 'Notre-Dame', position: [48.853, 2.3499] },
    ],
    route: [
      [48.8566, 2.3522],
      [48.8584, 2.2945],
      [48.8606, 2.3376],
      [48.853, 2.3499],
    ],
  },
  'dest-5': {
    center: [25.2048, 55.2708],
    attractions: [
      { name: 'Burj Khalifa', position: [25.1972, 55.2744] },
      { name: 'Palm Jumeirah', position: [25.1124, 55.139] },
      { name: 'Dubai Marina', position: [25.0806, 55.1404] },
    ],
    route: [
      [25.2048, 55.2708],
      [25.1972, 55.2744],
      [25.0806, 55.1404],
      [25.1124, 55.139],
    ],
  },
  'dest-6': {
    center: [35.6762, 139.6503],
    attractions: [
      { name: 'Senso-ji Temple', position: [35.7148, 139.7967] },
      { name: 'Shibuya Crossing', position: [35.6595, 139.7005] },
      { name: 'Tokyo Skytree', position: [35.7101, 139.8107] },
    ],
    route: [
      [35.6762, 139.6503],
      [35.6595, 139.7005],
      [35.7148, 139.7967],
      [35.7101, 139.8107],
    ],
  },
  'dest-7': {
    center: [40.7128, -74.006],
    attractions: [
      { name: 'Statue of Liberty', position: [40.6892, -74.0445] },
      { name: 'Central Park', position: [40.7829, -73.9654] },
      { name: 'Times Square', position: [40.758, -73.9855] },
    ],
    route: [
      [40.7128, -74.006],
      [40.6892, -74.0445],
      [40.758, -73.9855],
      [40.7829, -73.9654],
    ],
  },
  'dest-8': {
    center: [46.8182, 8.2275],
    attractions: [
      { name: 'Matterhorn', position: [45.9763, 7.6586] },
      { name: 'Jungfraujoch', position: [46.5475, 7.985] },
      { name: 'Lake Geneva', position: [46.4542, 6.5316] },
    ],
    route: [
      [46.8182, 8.2275],
      [46.5475, 7.985],
      [45.9763, 7.6586],
      [46.4542, 6.5316],
    ],
  },
  'dest-9': {
    center: [64.9631, -19.0208],
    attractions: [
      { name: 'Blue Lagoon', position: [63.8804, -22.4495] },
      { name: 'Thingvellir', position: [64.2559, -21.1294] },
      { name: 'Gullfoss', position: [64.3271, -20.1218] },
    ],
    route: [
      [64.9631, -19.0208],
      [64.2559, -21.1294],
      [64.3271, -20.1218],
      [63.8804, -22.4495],
    ],
  },
  'dest-10': {
    center: [-13.1631, -72.545],
    attractions: [
      { name: 'Machu Picchu', position: [-13.1631, -72.545] },
      { name: 'Huayna Picchu', position: [-13.1558, -72.5463] },
      { name: 'Sacred Valley', position: [-13.3246, -72.1608] },
    ],
    route: [
      [-13.3246, -72.1608],
      [-13.1631, -72.545],
      [-13.1558, -72.5463],
    ],
  },
  'dest-11': {
    center: [41.9028, 12.4964],
    attractions: [
      { name: 'Colosseum', position: [41.8902, 12.4922] },
      { name: 'Trevi Fountain', position: [41.9009, 12.4833] },
      { name: 'Vatican City', position: [41.9029, 12.4534] },
    ],
    route: [
      [41.9028, 12.4964],
      [41.9009, 12.4833],
      [41.8902, 12.4922],
      [41.9029, 12.4534],
    ],
  },
  'dest-12': {
    center: [41.3851, 2.1734],
    attractions: [
      { name: 'Sagrada Familia', position: [41.4036, 2.1744] },
      { name: 'Park Güell', position: [41.4145, 2.1527] },
      { name: 'Gothic Quarter', position: [41.3839, 2.1762] },
    ],
    route: [
      [41.3851, 2.1734],
      [41.4036, 2.1744],
      [41.4145, 2.1527],
      [41.3839, 2.1762],
    ],
  },
};
