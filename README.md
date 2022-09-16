# etherjs-function-overload
Function overload in Solidity being handled by ethersjs proof of concept.

Having the following code, where the `balanceOf()` function gets overloaded:
```solidity
contract SimpleToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("SimpleToken", "ST") {
        _mint(msg.sender, initialSupply);
    }

    function balanceOf(address user, address user2) external view returns(uint256, uint256) {
        return (balanceOf(user), balanceOf(user2));
    }
}
```

The following tests provide some insight about how etherjs handles this situation.

```javascript
    it("should throw a TypeError", async function () {
        const { stoken, deployerAddr, userAddr } = await loadFixture(deployTokenFixture);
        await expect(() => stoken.balanceOf(deployerAddr, userAddr)).to.throw(TypeError)
        await expect(() => stoken.balanceOf(deployerAddr)).to.throw(TypeError)
    })

    it("should work smoothly", async function () {
        const { stoken, deployerAddr, userAddr } = await loadFixture(deployTokenFixture);
        await stoken["balanceOf(address,address)"](deployerAddr, userAddr)
        await stoken["balanceOf(address)"](deployerAddr)
    })
```

Running with hardhat test.
```
matt at ether in ~/s/etherjs-function-overload (main|✔) 
↪ hh test test/funcion-overload-test.js
Compiled 5 Solidity files successfully


  Function overload testing
    ✔ should throw a TypeError (1614ms)
    ✔ should work smoothly (74ms)


  2 passing (2s)
```
