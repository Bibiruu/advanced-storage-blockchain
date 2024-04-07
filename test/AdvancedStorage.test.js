const AdvancedStorage = artifacts.require('AdvancedStorage');

contract('AdvancedStorage', () => {
    let advancedStorage = null;
    before(async () => {
        advancedStorage = await AdvancedStorage.deployed()
    });

    it('should add an id element to an array', async () => {
        await advancedStorage.add(10);
        const result = await advancedStorage.ids(0);
        assert(result.toNumber() === 10);
    });

    it('should get the element id in the array', async () => {
        await advancedStorage.add(20);
        const result = await advancedStorage.get(1);
        assert(result.toNumber() === 20);
    });

    it('should fetch an array of ids', async () => {
        const rawIds = await advancedStorage.getAll();
        //transfering big number to regular js number for easy assertion after
        const ids = rawIds.map(id => id.toNumber())
        assert.deepEqual(ids, [10,20]);
    });

    it('should return the length of the array', async () => {
        const length = await advancedStorage.length();
        //transfering big number to regular js number for easy assertion after
        assert(length.toNumber() === 2);
    });
});