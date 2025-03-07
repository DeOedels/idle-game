let computingPower = 0 
const EPSILON = 0.0001

const upgrades = {
    computeUpgrade: {
        name: "Improve Source Code",
        amount: 1,
        production: 1, //compute per click increase
        get totalProd() { return this.production * this.amount; },
        costMultiplier: 1.5,
        get cost() { return 10 * (this.costMultiplier ** ((this.amount - 1) ** 1.5)); }
    },
    optimizedScripts: {
        name: "Optimized Scripts",
        amount: 1,
        effect: 1.1, // Multiplier for passive income
        get totalMult() { return this.effect ** this.amount; },
        costMultiplier: 1.2,
        get cost() { return 100 * (this.costMultiplier**(this.amount - 1)); }
    },
};

const bots = {
    basicScript: {
        name: "Basic Script",
        amount: 0,
        production: 1, //compute per second
        get totalProd() { return this.production * this.amount; },
        costMultiplier: 1.4,
        get cost() { return 10 * (this.costMultiplier ** this.amount); }
    },
}

const elements = {
    powerCount: document.getElementById('powerCount'),
    computePerSec: document.getElementById('computePerSec'),
    compUpgradeBtn: document.getElementById('compUpgradeBtn'),
    basicScriptBtn: document.getElementById('basicScriptBtn'),
    optimizedScriptsBtn: document.getElementById('optimizedScriptsBtn'),
}

function updateUI() {
    elements.powerCount.innerText = computingPower.toFixed(1);
    elements.computePerSec.innerText = (totalPowerPerSecond()).toFixed(1);
    elements.compUpgradeBtn.innerText = Math.ceil(upgrades.computeUpgrade.cost);
    elements.basicScriptBtn.innerText = Math.ceil(bots.basicScript.cost);
    elements.optimizedScriptsBtn.innerText = Math.ceil(upgrades.optimizedScripts.cost);
}

document.getElementById("genComputeButton").addEventListener("click", function() {
    computingPower += upgrades.computeUpgrade.totalProd;
    updateUI();
});

document.getElementById("genComputeUpgradeButton").addEventListener("click", function() {
    let upgrade = upgrades.computeUpgrade;
    if (computingPower + EPSILON >= upgrade.cost) {
        computingPower -= upgrade.cost;
        upgrade.amount++;
        updateUI();
    }
});

document.getElementById("buyBasicScript").addEventListener("click", function() {
    let upgrade = bots.basicScript;
    if (computingPower + EPSILON >= upgrade.cost) {
        computingPower -= upgrade.cost;
        upgrade.amount++;
        updateUI();
    }
});

document.getElementById("buyOptimizedScripts").addEventListener("click", function() {
    let upgrade = upgrades.optimizedScripts;
    if (computingPower + EPSILON >= upgrade.cost) {
        computingPower -= upgrade.cost;
        upgrade.amount++;
        updateUI();
    }
});

let lastUpdate = performance.now();
function totalPowerPerSecond() {
    return bots.basicScript.totalProd * upgrades.optimizedScripts.totalMult;
}
function gameLoop(timestamp) {
    let deltaTime = (timestamp - lastUpdate) / 1000;
    lastUpdate = timestamp;

    let totalPowerPerSecond = totalPowerPerSecond();
    computingPower += totalPowerPerSecond * deltaTime;

    updateUI();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);