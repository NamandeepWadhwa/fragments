const fragment_database = require('../../src/model/data/memory/index.js');

let fragment={}
// setting fragment object before every test runs
beforeEach(()=>{
  fragment={
  "ownerId":"12345",
  "id":"abc",
  "value":"Hakai"
  }
})
// test writeFragment returns nothing
test('writeFragment returns nothing', async () => {
  const result = await fragment_database.writeFragment(fragment);
  expect(result).toBe(undefined);
});
// testting write fragment when id's are not provided
test ('writeFragment return error when one or none of the Id is provided',()=>{
 expect(async ()=>await fragment_database.writeFragment()).rejects.toThrow();
 expect(async ()=>await fragment_database.writeFragment({ownerId:"12345"})).rejects.toThrow();
  expect(async ()=>await fragment_database.writeFragment({id:"abc"})).rejects.toThrow();
});

// reading fragment returns what we write into the db
test('readFragment returns what we write into the db', async () => {
  await fragment_database.writeFragment(fragment);
  const result = await fragment_database.readFragment(fragment.ownerId,fragment.id);
  expect(result).toEqual(fragment);
} );
// testing read fragment when id's are not provided
test ('readFragment return error when one or none of the Id is provided',()=>{
  expect(async ()=>await fragment_database.readFragment()).rejects.toThrow();
  expect(async ()=>await fragment_database.readFragment({ownerId:"12345"})).rejects.toThrow();
   expect(async ()=>await fragment_database.readFragment({id:"abc"})).rejects.toThrow();
  });
// testing writeFragmentData with buffer returns nothing
test('writeFragmentData returns nothing', async () => {
  let buffer = Buffer.from(fragment.value);
  const result = await fragment_database.writeFragmentData(fragment.ownerId,fragment.id,buffer);
  expect(result).toBe(undefined);
} );
// testing readFragmentData with buffer returns what we write into the db
test('readFragmentData returns what we write into the db', async () => {
  let buffer = Buffer.from(fragment.value);
  await fragment_database.writeFragmentData(fragment.ownerId,fragment.id,buffer);
  const result = await fragment_database.readFragmentData(fragment.ownerId,fragment.id);
  expect(result).toEqual(buffer);
} );
// testing listFragments returns all fragment ids
test('listFragments returns all fragment ids', async () => {
  await fragment_database.writeFragment(fragment);
  const results = await fragment_database.listFragments(fragment.ownerId);
  expect(Array.isArray(results)).toBe(true);
  expect(results).toEqual([fragment.id]);
} );
// testing listFragments returns empty array
test('List fragments return error when now ownerId is provided',()=>{
  expect(async ()=>await fragment_database.listFragments()).rejects.toThrow();
});
// testing listFragments returns fragment object
test('list fragments returns fragment objetc', async()=>{
  await fragment_database.writeFragment(fragment);
  const results = await fragment_database.listFragments(fragment.ownerId,true);
  expect(results).toEqual([fragment]);
});

// testing deleteFragment returns nothing
test('deleteFragment removes value put into db', async () => {
  await fragment_database.writeFragment(fragment);
  expect(await fragment_database.readFragment(fragment.ownerId,fragment.id)).toEqual(fragment);
  await fragment_database.deleteFragment(fragment.ownerId,fragment.id);
  expect(await fragment_database.readFragment(fragment.ownerId,fragment.id)).toBe(undefined);
} );
// testing deleteFragment when id's are not provided
test ('deleteFragment return error when one or none of the Id is provided',()=>{
  expect(async ()=>await fragment_database.deleteFragment()).rejects.toThrow();
  expect(async ()=>await fragment_database.deleteFragment({ownerId:"12345"})). rejects.toThrow();
   expect(async ()=>await fragment_database.deleteFragment({id:"abc"})).rejects.toThrow();
  });
// testing deleteFragment when key does not exist
  test('deleteFragment whne key does not exist', ()=>{
    expect(async ()=>await fragment_database.deleteFragment("12345","abc")).rejects.toThrow();
  })
