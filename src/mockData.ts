import { TableData } from "./interfaces/data.interface";

const mockData: TableData[] = [
  {
    id: 3492,
    rowName: "first",
    total: 1,
    salary: 1,
    mimExploitation: 0,
    machineOperatorSalary: 1,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 2,
    overheads: 4,
    estimatedProfit: 0,
    child: [
      {
        id: 3493,
        rowName: "level2",
        total: 0,
        salary: 1,
        mimExploitation: 0,
        machineOperatorSalary: 1,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 1,
        overheads: 2,
        estimatedProfit: 0,
        child: []
      }
    ]
  },
  {
    id: 3494,
    rowName: "second",
    total: 6,
    salary: 3,
    mimExploitation: 3,
    machineOperatorSalary: 1,
    materials: 0,
    mainCosts: 0,
    supportCosts: 0,
    equipmentCosts: 2,
    overheads: 4,
    estimatedProfit: 0,
    child: []
  }
];

export default mockData;
