const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ligase", function () {
  it("Should deploy the NFT contract", async function () {
    const Ligase = await ethers.getContractFactory("Ligase");
    const ligase = await Ligase.deploy();
    await ligase.deployed();

    expect(ligase.deployed());
  });

  it("Should mint an NFT and emit tokenURI", async function () {
    const Ligase = await ethers.getContractFactory("Ligase");
    const ligase = await Ligase.deploy();
    await ligase.deployed();

    // mint token to address with tokenURI in format ipfs://CID
    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const cid = "QmTnkdgFsVS93mJrgdpwZHwbCziiEy4cpBwcwvacCoeq2y";
    const count = 0;

    await expect (ligase.safeMint(address, cid))
      .to.emit(ligase, "tokenMinted")
      .withArgs(count, cid, address);
  });

  it("Should increment token ID upon multiple mints", async function () {
    const Ligase = await ethers.getContractFactory("Ligase");
    const ligase = await Ligase.deploy();
    await ligase.deployed();

    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const cid = "QmTnkdgFsVS93mJrgdpwZHwbCziiEy4cpBwcwvacCoeq2y";
    let count = 0;

    await ligase.safeMint(address, cid);
    count++;

    await expect (ligase.safeMint(address, cid))
      .to.emit(ligase, "tokenMinted")
      .withArgs(count, cid, address);
  });
});