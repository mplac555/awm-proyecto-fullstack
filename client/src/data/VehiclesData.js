export const ownerFields = [
  { id: "ownerName", label: "Propietario" },
  { id: "ownerDNI", label: "Cédula" },
];
export const vehicleFields = [
  { id: "vModel", label: "Modelo Vehículo" },
  { id: "plateNo", label: "Nº Placa" },
  { id: "color", label: "Color" },
];

export const initialOwnersList = [
  {
    id: 1,
    name: "Jeremy Peralbo",
    idCardNo: "17507311550",
    vehicles: [
      { id: 1, vModel: "Chevrolet", plateNo: "PC501", color: "Negro" },
      { id: 2, vModel: "Kía", plateNo: "GY5023", color: "Rojo" },
    ],
  },
  {
    id: 2,
    name: "Marcelo Placencia",
    idCardNo: "5151845152",
    vehicles: [
      { id: 3, vModel: "Nissan", plateNo: "SDV505", color: "Plateado" },
      { id: 4, vModel: "Volkswagen", plateNo: "TYN654", color: "Verde" },
    ],
  },
];
