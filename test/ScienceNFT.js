const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ScienceNFT", function () {
  it("Should deploy the NFT contract", async function () {
    const ScienceNFT = await ethers.getContractFactory("ScienceNFT");
    const scienceNFT = await ScienceNFT.deploy();
    await scienceNFT.deployed();

    expect(scienceNFT.deployed());
  });

  it("Should mint an NFT and emit tokenURI", async function () {
    const ScienceNFT = await ethers.getContractFactory("ScienceNFT");
    const scienceNFT = await ScienceNFT.deploy();
    await scienceNFT.deployed();

    // mint token to address with tokenURI in format ipfs://CID
    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const cid = "QmTnkdgFsVS93mJrgdpwZHwbCziiEy4cpBwcwvacCoeq2y";
    const count = 0;

    await expect (scienceNFT.safeMint(address, cid))
      .to.emit(scienceNFT, "tokenMinted")
      .withArgs(count, cid, address)
  });

  it("Should increment token ID upon multiple mints", async function () {
    const ScienceNFT = await ethers.getContractFactory("ScienceNFT");
    const scienceNFT = await ScienceNFT.deploy();
    await scienceNFT.deployed();

    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const cid = "QmTnkdgFsVS93mJrgdpwZHwbCziiEy4cpBwcwvacCoeq2y";
    let count = 0;

    await scienceNFT.safeMint(address, cid);
    count++;

    await expect (scienceNFT.safeMint(address, cid))
      .to.emit(scienceNFT, "tokenMinted")
      .withArgs(count, cid, address)
  });
});