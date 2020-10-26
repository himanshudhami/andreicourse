import { Cat } from './cat.class.js';
import { Human } from './human.class.js';

function main() {
  console.clear();

  let andrei = new Human('Andrei', 50, 'male');
  let pissy = new Cat('Pissy', 5, 'female');
  
  andrei.getIntroduction(`How are you today?`);
  console.log('')
  pissy.getIntroduction('mi mi mi miaaaaoowww');
}

main();/// entry point