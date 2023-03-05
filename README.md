# KDurf-Senior-Design-Project
**DIGITAL SIMULATION**

For my (Kevin Durfee's) Senior Design project, I have created and implemented an educational simulation of the Safety Loop system for the FSAE EV cars, based on the 2023 Formula Hybrid SAE + Electric ruleset. 

Shown below is the FSM Diagram for the Safety Loop system, with the omission of lights/sounds. Along with it is the state transition table for the respective FSM. 

<p align="center">
<img width="799" alt="Safety Loop (re-colored for transparent github background)" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/1744e4291ccad6e8655a9a90a026f6cd2ea9285c/Safety%20Loop%20(re-colored%20for%20transparent%20github%20background).png">

<img width="615" alt="Screen Shot 2022-10-26 at 2 07 39 PM" src="https://user-images.githubusercontent.com/113051608/198102986-43ce1c87-8912-474d-b750-fd08169fbbb0.png">
</p>

For those still learning about the FSAE EV Safety Loop system, or is new to the Lafayette Motorsports Team, I've provided a legend/key that explains the jargon I used.

<p align="center">
<img width="491" alt="Screen Shot 2022-10-26 at 2 09 24 PM" src="https://user-images.githubusercontent.com/113051608/198103351-8ac7c014-0034-4e53-aff4-c564d5e79532.png">
</p>

To further help understand the State Transition Table, as well as the javascript used to create the simulation, I have provided a table that briefly explains the FSM Boolean Logic used and a Truth Table that provides further examples on this Boolean Logic.

<p align="center">
<img width="586" alt="Screen Shot 2022-10-26 at 2 12 02 PM" src="https://user-images.githubusercontent.com/113051608/198103940-14fd22e9-327f-42b6-9ddd-91d90e6cbcd0.png">

<img width="609" alt="Screen Shot 2022-10-26 at 2 12 33 PM" src="https://user-images.githubusercontent.com/113051608/198103954-0f4f12a3-733e-494b-9483-dc91200ce20d.png">
</p>

Provided below is a simplified table, to help elaborate on and explain the necessary steps to transition between states and get the car ready to drive while complying with the Safety Loop/Shutdown Circuit.

<p align="center">
<img width="1190" alt="Screen Shot 2022-12-06 at 2 24 26 PM" src="https://user-images.githubusercontent.com/113051608/206003580-44986681-b438-47c6-8f01-a57b5cdf265b.png">
</p>

To provide further elaboration on the table above and create a better understanding of the simulation, there are a few features present in the simulation (either loosely explained or not explained above) that I'd like the describe. The first being the Ready-To-Drive Sound. The Ready-To-Drive Sound is 80 dbA sound that lasts for 2 seconds, that signifies that the car is ready to drive (meaning the simulation have left the TS Energized, Not Ready-To-Drive state and has entered the TS Energized, Ready-To-Drive state). This sound/buzzer is required on the car, as outlined in EV9.2 of the 2023 Formula Hybrid + Electric Rules and occurs in the simulation (hence it is encouraged to have the computer's sound on when using the simulation). Separately, in the event of any fault occuring on the car (either AMS, IMD, or Brake Overtravel Lockout), the Safety Loop/Shutdown Circuit is triggered. This results in the car, and hence the simulation, disengaging the tractive system and only keeping the GLV system on (entering the TS Off, GLV On sate). This is done for the protection of high/tractive system voltage for the driver, team, or bystanders. The GLV system remains on/energized, as it is used to power the Safety Loop/Shutdown Circuit. To help correct the car/re-energize it, all live voltage systems should bew shutdown and disengaged prior to examing the cause of the fault. Once the cause of the fault is found, the system can be re-energized using the previously outlined steps/procedures. For the simulation, if a fault occurs/fault button is engaged, the simulaton returns to the TS Off, GLV On state. From there, disengage the motor controller switch, the cockpit BRB and the TSMS. To re-energize the car, "correct/fix" the "faults" by disenganging the respective fault buttons, then procede to re-energize the car with the same steps from the TS Off, GLV On state as before.

For further clarification of the simulation, below indicates the button's appearances for the "engaged" and "not engaged" states.

<p align="center">
BRB BUTTONS
</p>

<p align="center">
  NOT ENGAGED
<img width="100" alt="Safety Loop (re-colored for transparent github background)" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/1d54052522dec26bc64806d8f330edb58eff1a17/BRB%20Not%20Engaged.png">
<img width="100" alt="Safety Loop (re-colored for transparent github background)" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/131340d3d1f3de5c4e9387ae30fa439f3fdbb228/BRB%20Engaged.png">
  ENGAGED
</p>

<p align="center">
GREEN BUTTONS (NON-BRB)
</p>

<p align="center">
  NOT ENGAGED
<img width="100" alt="Safety Loop (re-colored for transparent github background)" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/4727a8d5e096cbd7454bc4d00514fffa765b4615/GreenNotEngaged.png">
<img width="100" alt="Safety Loop (re-colored for transparent github background)" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/4727a8d5e096cbd7454bc4d00514fffa765b4615/GreenEngaged.png">
  ENGAGED
</p>

For ease of access, the educational Safety Loop simulation can be found here: https://kdurf15.github.io/KDurf-Senior-Design-Project/

**HARDWARE IMPLEMENTATION**

In addition to the digital/virtual simulation, I have created a physical small-scale version of the Shutdown Circuit. All features and hardware that would be on the actual Lafayette Motorsports FSAE EV car are present on the PCB test rig, just scaled down. The only exception to this would be the faults (BOTS, IMD, and AMS), which are represented via latching switches (similarly to the digital/virtual simulation). The PCB Safety Loop/Shutdown Circuit tool uses 3V and 9V batteries, on separate paths, to mimic the grounded low voltage (GLV) and tractive system (TS) of the car.

The first step when creating this PCB was to design the pre-charge circuit and circuit diagram. As a reminder, the pre-charge circuit works to prevent a sudden spike in current that would result in welding the AIRs shut (live). The time duration for the pre-charge relay, determined to be approximately 3 seconds (5 time constants), are shown below.

<p align="center">
  Target of ~99.3% Charge in 5 time constants (3 seconds)
  5𝜏 = 3 seconds   →   𝜏 = 0.6 seconds
  𝜏 = RC
  Motor Inverter DC Bus Capacitance, C = 300 μF
  R = 𝜏/C = (0.6 seconds)/(300 μF) = 2kΩ
  
  Max current target, based on full ~300V
  (300V)/(2 kΩ) = 0.15 A
  
  Power Dissipated through Resistor
  (0.15^2 A)*(2 kΩ) = 45 W Max
</p>

The pre-charge time delay, both for the small-scale PCB safety loop implementation and the physical implementation in the full-scale car, will use a 555 timer. The safety loop circuit, including the 555 timer, was initially designed in falstad. The falstad is shown below and can be found here: https://tinyurl.com/ctu5a7be

<p align="center">
PUT FALSTAD IMAGINE IN HERE
</p>

This was then implemented onto a PCB with silk screens to illustrate the specific wiring path, for ease of learning and understanding. A picture of the PCB design is shown below and can be found in under the "PCB Design" folder.

<p align="center">
INSERT FUSION 360 PCB DESIGN PHOTO AND ADD FILES TO FOLDER ON GITHUB
</p>

For the small-scale Safety Loop/Shutdown Circuit PCB tool to appear more similar to the car's layout, buttons and switches were respectively mounted on 3D-printed "side panels" or "cockpit panels," similar to those on the car. Attachments for the rotary switches were also printed to mimic the red GLV and TS master switches. All .stl files for the 3D-printed designs can be found in the "3D Printed Models" folder. The completed PCB Safety Loop/Shutdown Circuit educational tool is shown below.

<p align="center">
INSERT LABELED (OR UNLABELED) PHOTO OF THE COMPLETED PCB TOOL
</p>

If any issues or questions arise with the code/simulation/hardware/project, please feel free to contact me (Kevin/Durf) at (609) 917-4527, kdurf15@comcast.net, or durfeekd@lafayette.edu (if my Lafayette email address is still active).
