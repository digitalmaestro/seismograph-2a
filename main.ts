function compass () {
    while (input.compassHeading() > 0) {
        if (input.compassHeading() >= 355 && input.compassHeading() <= 360 || input.compassHeading() >= 0 && input.compassHeading() <= 5) {
            basic.showArrow(ArrowNames.North)
            basic.pause(5000)
            break;
        } else {
            basic.showIcon(IconNames.Sad)
        }
    }
    basic.clearScreen()
}
function QUAKE () {
    basic.showString("S")
    xvalues = []
    yvalues = []
    zvalues = []
    svalues = []
    startTime = input.runningTime()
    finishTime = input.runningTime() - startTime
    while (finishTime < totalTimems) {
        xaccel = input.acceleration(Dimension.X)
        yaccel = input.acceleration(Dimension.Y)
        zaccel = input.acceleration(Dimension.Z)
        if (xaccel > xavg || xaccel < xavg) {
            xvalues.push(xaccel)
            basic.showString("X")
        }
        if (yaccel > yavg || yaccel < yavg) {
            yvalues.push(yaccel)
            basic.showString("Y")
        }
        if (zaccel > zavg || zaccel < zavg) {
            zvalues.push(zaccel)
            basic.showString("Z")
        }
        finishTime = input.runningTime() - startTime
    }
    basic.showString("F")
}
function DOWNLOAD () {
    basic.showIcon(IconNames.Diamond)
    for (let xindex = 0; xindex <= xvalues.length - 1; xindex++) {
        xtvalue = xvalues[xindex]
        serial.writeValue("X-values", xtvalue)
    }
    for (let yindex = 0; yindex <= yvalues.length - 1; yindex++) {
        ytvalue = yvalues[yindex]
        serial.writeValue("Y-values", ytvalue)
    }
    for (let zindex = 0; zindex <= zvalues.length - 1; zindex++) {
        ztvalue = zvalues[zindex]
        serial.writeValue("Z-values", ztvalue)
    }
    for (let sindex = 0; sindex <= svalues.length - 1; sindex++) {
        stvalue = svalues[sindex]
        serial.writeValue("S-values", stvalue)
    }
    basic.showIcon(IconNames.SmallDiamond)
}
input.onButtonPressed(Button.A, function () {
    radio.sendString("north")
})
function CALIBRATE () {
    for (let index = 0; index < calibrateRounds; index++) {
        basic.showIcon(IconNames.Yes)
        xaccel = xaccel + input.acceleration(Dimension.X)
        yaccel = yaccel + input.acceleration(Dimension.Y)
        zaccel = zaccel + input.acceleration(Dimension.Z)
        saccel = saccel + input.acceleration(Dimension.Strength)
        basic.pause(1000)
    }
    xavg = xaccel / calibrateRounds
    yavg = yaccel / calibrateRounds
    zavg = zaccel / calibrateRounds
    savg = saccel / calibrateRounds
    basic.showIcon(IconNames.Happy)
}
input.onButtonPressed(Button.AB, function () {
    radio.sendString("compass")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == startKeyWord) {
        QUAKE()
    }
    if (receivedString == calibrate) {
        CALIBRATE()
    }
    if (receivedString == download) {
        DOWNLOAD()
    }
    if (receivedString == direction) {
        compass()
    }
    if (receivedString == orientation) {
        compassOriented = "YES"
    }
})
input.onButtonPressed(Button.B, function () {
    radio.sendString("download")
})
let savg = 0
let saccel = 0
let stvalue = 0
let ztvalue = 0
let ytvalue = 0
let xtvalue = 0
let zavg = 0
let yavg = 0
let xavg = 0
let finishTime = 0
let startTime = 0
let svalues: number[] = []
let zvalues: number[] = []
let yvalues: number[] = []
let xvalues: number[] = []
let totalTimems = 0
let calibrateRounds = 0
let compassOriented = ""
let orientation = ""
let direction = ""
let download = ""
let startKeyWord = ""
let calibrate = ""
let zaccel = 0
let yaccel = 0
let xaccel = 0
radio.setGroup(1)
xaccel = 0
yaccel = 0
zaccel = 0
calibrate = "calibrate"
startKeyWord = "quake"
download = "download"
direction = "compass"
orientation = "north"
compassOriented = "NO"
let offset = 50
calibrateRounds = 10
totalTimems = 15000
