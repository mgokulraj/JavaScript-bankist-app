'use strict';

const juliaData1 = [3, 5, 2, 12, 7];
const juliaData2 = [9, 16, 6, 8, 3];

const kateData1 = [4, 1, 15, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs = function (jd, kd) {
  const juliaCorrected = [...jd];
  // console.log(juliaCorrected.slice(1, -2));
  const finalData = [...juliaCorrected.slice(1, -2), ...kd];

  finalData.forEach(function (dog, i) {
    const dogValue = dog < 3 ? 'is still a puppy🐶' : 'is an Adult';
    console.log(`Dog number ${i + 1} ${dogValue}, and is ${dog} years old`);
  });
};

// checkDogs(juliaData1, kateData1);

//----------------- Challenge 2 --------------------

//--------- using forEach
// const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
// const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (age) {
//   console.log(age);
//   const humanAgeArry = [];
//   age.forEach(function (dogAge, i) {
//     const humanAge = dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
//     console.log(`Dog ${i + 1} human age is ${humanAge}`);
//     humanAgeArry.push(humanAge);
//   });
//   console.log(humanAgeArry);

//   const adultHuman = humanAgeArry.filter(function (value) {
//     return value >= 18;
//   });
//   console.log(adultHuman);

//   const adultHumanAvg = adultHuman.reduce(function (acc, value) {
//     return acc + value / adultHuman.length;
//     // return acc + value;
//   }, 0);

//   console.log(adultHumanAvg);
// };

// calcAverageHumanAge(dogAge1);

//-------------using map
const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = function (age) {
  const humanAgeArry = age.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAgeArry);

  const adultHuman = humanAgeArry.filter(value => value >= 18);
  console.log(adultHuman);

  const adultHumanAvg = adultHuman.reduce(
    (acc, curr, i, arr) => acc + curr / arr.length,
    0
  );
  console.log(adultHumanAvg);
};

// const dogAge1 = [5, 2, 4, 1, 15, 8, 3];
// const dogAge2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = age => {
//   const humanAgeArry = age
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(value => value >= 18)
//     .reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);
//   console.log(humanAgeArry);
// };

calcAverageHumanAge(dogAge1);
// calcAverageHumanAge(dogAge2);

// ------------------- Challenge 4 ----------------

//Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little. Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite. Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const dogs1 = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'], recomFood: 251 },
  { weight: 8, curFood: 200, owners: ['Matilda'], recomFood: 200 },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'], recomFood: 250 },
  { weight: 32, curFood: 340, owners: ['Michael'], recomFood: 250 },
];

console.log(`------Answer 1-------`);
//1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do not create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dog => (dog.recomFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

console.log(`------Answer 2-------`);
//2. Find Sarah's dog and log to the console whether it's eating too much or too little. Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
let str = 'Sarah';
const sarahDog = dogs.find(dog => dog.owners.includes(str));
console.log(sarahDog);
if (
  sarahDog.curFood > sarahDog.recomFood * 0.9 &&
  sarahDog.curFood < sarahDog.recomFood * 1.1
) {
  console.log(`${str}'s Dog is eating Okay`);
} else if (sarahDog.curFood > sarahDog.recomFood) {
  console.log(`${str}'s Dog is eating too much`);
} else {
  console.log(`${str}'s Dog is eating too little`);
}

console.log(`------Answer 3-------`);
//3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

const eatTooMuch = dogs
  .filter(dog => dog.recomFood < dog.curFood)
  .flatMap(dog => dog.owners);
console.log(eatTooMuch);

const eatTooLittle = dogs
  .filter(dog => dog.recomFood > dog.curFood)
  .flatMap(dog => dog.owners);
console.log(eatTooLittle);

console.log(`------Answer 4-------`);
//4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${eatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${eatTooLittle.join(' and ')}'s dogs eat too much!`);

console.log(`------Answer 5-------`);
//5. Log to the console whether there is any dog eating exactly the amount of food that is recommended (just true or false)

const eatCorrect = dogs.some(dog => dog.recomFood === dog.curFood);
console.log(eatCorrect);

console.log(`------Answer 6-------`);
//6. Log to the console whether there is any dog eating an okay amount of food (just true or false)

const eatOkay = dogs.some(
  dog => dog.curFood > dog.recomFood * 0.9 && dog.curFood < dog.recomFood * 1.1
);
console.log(eatOkay);

console.log(`------Answer 7-------`);
//7. Create an array containing the dogs that are eating an okay amount of food (try to reuse the condition used in 6.)

const eatOk = dogs.filter(
  dog => dog.curFood > dog.recomFood * 0.9 && dog.curFood < dog.recomFood * 1.1
);
console.log(eatOk);

console.log(`------Answer 8-------`);
//8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects 😉)

const dogsSorted = dogs.slice().sort((a, b) => a.recomFood - b.recomFood);

console.log(dogsSorted);
