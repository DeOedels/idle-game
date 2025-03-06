let computingPower = 0 
let autoPower = 0

function updateUI() {
    document.getElementById('powerCount').innerText = computingPower.toFixed(2)
    document.getElementById('upgradeCost').innerText = (10 + autoPower*5).toFixed(2)
}

document.getElementById("computeBtn").addEventListener("click", function() {
    computingPower += 1
    updateUI()
})

document.getElementById("buyUpgradeBtn").addEventListener("click", function() {
    let cost = 10+autoPower*5
    if (computingPower >= cost) {
        computingPower -= cost
        autoPower += 1
        updateUI()
    }
})

setInterval(function() {
    computingPower += autoPower * 0.5
    updateUI()
}, 1000)

updateUI()