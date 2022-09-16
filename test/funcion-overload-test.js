const hre = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const {expect } = require("chai");

describe("Function overload testing", function () {
    async function deployTokenFixture() {
        const deployer = ethers.provider.getSigner(0)
        const deployerAddr = deployer.getAddress()
        const userAddr = ethers.provider.getSigner(1).getAddress()
        const sTokenFactory = await ethers.getContractFactory("SimpleToken", deployer)

        const supply = ethers.utils.parseEther("100")
        const stoken = await sTokenFactory.deploy(supply)
        await stoken.deployed()
        
        return { deployerAddr, userAddr, stoken };
    }

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
})
