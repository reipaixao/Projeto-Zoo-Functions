const { species, employees, prices } = require('./data');
const data = require('./data');
// console.log(data);

function getSpeciesByIds(...ids) {
  return species.filter((i) => ids.includes(i.id));
}

function getAnimalsOlderThan(animal, age) {
  const animals = species.find((i) => i.name === animal);
  return animals.residents.every((resident) => resident.age >= age);
}

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.find((i) => i.firstName === employeeName || i.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees.some((employee) => employee.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmp = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmp);
}

function countAnimals(species2) {
  if (!species2) {
    const count = {};
    species.forEach((value) => {
      count[value.name] = value.residents.length;
    });
    return count;
  }
  const contador = species.find((i) => i.name === species2);
  return contador.residents.length;
}

function calculateEntry(entrants) {
  if (entrants === undefined || entrants === {}) {
    return 0;
  }
  return Object.keys(entrants)
    .reduce((accumulator, currentValue) =>
      accumulator + (entrants[currentValue] * prices[currentValue]), 0);
}

//   function getAnimalMap(options) {
   
// }

function getSchedule(dayName) {
  const dataHour = { ...data.hours };
  // console.log(dataHour);
  Object.entries(dataHour).forEach((day) => {
    dataHour[day[0]] = `Open from ${day[1].open}am until ${day[1].close - 12}pm`;
    // console.log(dataHour);
    if (day[1].open === day[1].close) {
      dataHour[day[0]] = 'CLOSED';
    }
  });
  return (dayName !== undefined) ? { [dayName]: dataHour[dayName] } : dataHour;
}
// console.log(getSchedule());

function getOldestFromFirstSpecies(id) {
  const funcionario = data.employees.find((employee) => employee.id === id);
  const especie = data.species.find((specie) => specie.id === funcionario.responsibleFor[0]);
  const maisVelho = especie.residents.sort((a, b) => b.age - a.age);
  return Object.values(maisVelho[0]);
}

function increasePrices(percentage) {
  Object.keys(prices).forEach((value) => {
    prices[value] = Math.round((prices[value] * (percentage / 100 + 1)) * 100) / 100;
  });
}

// function getEmployeeCoverage(idOrName) {
//   // seu código aqui
// }

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  // getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  // getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
