let computingPower = 0 
let autoPower = 0
let computeClick = 1
const updateInterval = 50 //updates every 50ms
const ticksPerSecond = 1000 / updateInterval
const EPSILON = 0.0001

const upgrades = {
    computeUpgrade: {
        name: "Improve Source Code",
        amount: 1,
        production: 1, //compute per click increase
        get totalProd() { return this.production * this.amount; },
        costMultiplier: 1.3,
        get cost() { return 10 * Math.pow(this.costMultiplier, this.amount-1); }
    },
    basicScript: {
        name: "Basic Script",
        amount: 0,
        production: 1, //compute per second
        get totalProd() { return this.production * this.amount; },
        costMultiplier: 1.15,
        get cost() { return 10 * Math.pow(this.costMultiplier, this.amount); }
    }
}

function updateUI() {
    document.getElementById('powerCount').innerText = computingPower.toFixed(1)
    document.getElementById('compUpgradeBtn').innerText = upgrades.computeUpgrade.cost.toFixed(1)
    document.getElementById('basicScriptBtn').innerText = upgrades.basicScript.cost.toFixed(1)
}

document.getElementById("genComputeButton").addEventListener("click", function() {
    computingPower += upgrades.computeUpgrade.totalProd
    updateUI()
})

document.getElementById("genComputeUpgradeButton").addEventListener("click", function() {
    let upgrade = upgrades.computeUpgrade
    if (computingPower + EPSILON >= upgrade.cost) {
        computingPower -= upgrade.cost
        upgrade.amount++
        updateUI()
    }
})

document.getElementById("buyBasicScript").addEventListener("click", function() {
    let upgrade = upgrades.basicScript
    if (computingPower + EPSILON >= upgrade.cost) {
        computingPower -= upgrade.cost
        upgrade.amount++
        updateUI()
    }
})

let lastUpdate = performance.now();

function gameLoop(timestamp) {
    let deltaTime = (timestamp - lastUpdate) / 1000;
    lastUpdate = timestamp;

    let totalPowerPerSecond = upgrades.basicScript.totalProd;
    
    computingPower += totalPowerPerSecond * deltaTime;
    
    updateUI();
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);