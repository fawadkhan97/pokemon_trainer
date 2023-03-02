import { CheckIfPokemonExistsInTrainerCollectionPipe } from './check-if-pokemon-exists-in-trainer-collection.pipe';

describe('CheckIfPokemonExistsInTrainerCollectionPipe', () => {
  it('create an instance', () => {
    const pipe = new CheckIfPokemonExistsInTrainerCollectionPipe();
    expect(pipe).toBeTruthy();
  });
});
