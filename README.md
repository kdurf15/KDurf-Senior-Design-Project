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

For ease of access, the screenshot of the Safety Loop simulation 

A photo of the educational Safety Loop simulation is shown below. For ease of access, the below photo serves as a hyperlink to the simulation itself.

<p align="center">
  
  <a href="https://kdurf15.github.io/KDurf-Senior-Design-Project/"><img src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/d4cb8599bf7250e0ddacb138cbd1f26489f058e9/Labeled%20Sim%20Photo.png" width="2734"></a>
       
CONSIDER SWAPPED FOR NON-LABELED PHOTO FROM DESKTOP
</p>




**HARDWARE IMPLEMENTATION**

In addition to the digital/virtual simulation, I have created a physical small-scale version of the Shutdown Circuit. All features and hardware that would be on the actual Lafayette Motorsports FSAE EV car are present on the PCB test rig, just scaled down. The only exception to this would be the faults (BOTS, IMD, and AMS), which are represented via latching switches (similarly to the digital/virtual simulation). The PCB Safety Loop/Shutdown Circuit tool uses 3V and 9V batteries, on separate paths, to mimic the grounded low voltage (GLV) and tractive system (TS) of the car.

The first step when creating this PCB was to design the pre-charge circuit and circuit diagram. As a reminder, the pre-charge circuit works to prevent a sudden spike in current that would result in welding the AIRs shut (live). The time duration for the pre-charge relay, determined to be approximately 3 seconds (5 time constants), are shown below.

<p align="center">
  Target of ~99.3% Charge in 5 time constants (3 seconds)
</p>

<p align="center">
  5𝜏 = 3 seconds   →   𝜏 = 0.6 seconds
</p>

<p align="center">
  𝜏 = RC
</p>
  
<p align="center">
  Motor Inverter DC Bus Capacitance, C = 300 μF
</p>

<p align="center">
  R = 𝜏/C = (0.6 seconds)/(300 μF) = 2kΩ
  
</p>



<p align="center">
  Max current target, based on full ~300V
</p>
<p align="center">
  (300V)/(2 kΩ) = 0.15 A
  
</p>



<p align="center">
  Power Dissipated through Resistor
</p>

<p align="center">
  (0.15^2 A)*(2 kΩ) = 45 W Max
</p>

The pre-charge time delay, both for the small-scale PCB safety loop implementation and the physical implementation in the full-scale car, will use a 555 timer. The safety loop circuit, including the 555 timer, was initially designed in falstad. The falstad is shown below and can be found here: https://tinyurl.com/ctu5a7be

<p align="center">
<img width="586" alt="falstad screenshot" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/72ebd165b6dff8e0f7a78f02cb3391a4ea31a5c4/falstad%20screenshot.png">
</p>

As required by the 2023 Formula SAE Hybrid + Electric rule set, the Isolation Monitoring Device (IMD) and Accumulator Management System (AMS) require latching circuits for the faults. Two suggested designs, for either fault low or high, are provided in the Appendix G of the rules and is shown below.

<p align="center">
  <img width="586" alt="Falstad Latching Circuit" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/175000567e2def979cb57df49dcb3db0eb2c752a/Appendix%20G%20Latching%20Circuit.png">
</p>

This design was considered and the corresponding design was completed in falstad. The "fault" was considered/modeled as a latching switch. The falstad is not fully rules-compliant, as it needs the addition of a flyback diode, as shown in the rules. The falstad design is shown below and can be found here: https://tinyurl.com/23wacp5r

<p align="center">
  <img width="586" alt="Falstad Latching Circuit" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/a1ef0033f88fbdf8f094d757da383d9f4f392fa8/Falstad%20Latching%20Circuit.png">
</p>

The latching circuit used on the Safety Loop/Shutdown Circuit Educational PCB is simplified to the reset latching portion, providing "feedback" to require the reset switch. Given that the PCB is wired in series, pressing the fault button to simulate a fault shutdown. Due to the tactile connection of creating a fault with the fault button, a fault LED signal was not included.

This, along with the entirity of the Safety Loop/Shutdown Circuit system, was then implemented onto a PCB with silk screens to illustrate the specific wiring path, for ease of learning and understanding. A picture of the PCB design is shown below. Fusion 360 and Eagle schematic files can be found in the compressed folder, "Shutdown Circuit PCB Schematic Files," which is permalinked here: https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/f66a77cbe09608431833e2ea92ca653daefc6d79/Shutdown%20Circuit%20PCB%20Schematic%20Files.zip

Below is a photo of the PCB Schematic, both normal and trimmed nets

<p align="center">
  <img width="706" alt="PCB Schematic" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/20650611ab7f731d7821bba60f4589752a2b1333/PCB%20Schematic.png">
</p>

<p align="center">
  <img width="706" alt="PCB Schematic Trimmed" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/191e0d629f51c0c2f05d1741beeff35ed7a91f51/PCB%20Schematic%20Trimmed.png">
</p>

Below shows the PCB silkscreen and physical board layout, based on the previously showed schematic

<p align="center">
  <img width="706" alt="PCB Layout Photo" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/5304f1a94ec4681c94315d3332f6c63b97bb314e/PCB%20Layout%20Photo.png">

</p>

<p align="center">
  <img width="706" alt="Silk Screen PCB Schematic" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/c1427304e6f8bb93b3e2e9ef899f95daae3876f5/Silk%20Screen%20PCB%20Schematic.png">

</p>

Photos of the 3D model of the above PCB are shown below.

<p align="center">
  <img width="1440" alt="Durfee Safety Loop 3D PCB Photo" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/e07205d62491980e664e26d1c7cfeda07ddeb668/Durfee%20Safety%20Loop%203D%20PCB%20Photo.png">
</p>

<p align="center">
  <img width="1440" alt="Durfee Safety Loop 3D PCB Photo 2" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/2ea67b3be7a0561681d4466bf4ea05114f643999/Durfee%20Safety%20Loop%203D%20PCB%20Photo%202.png">
</p>


For the small-scale Safety Loop/Shutdown Circuit PCB tool to appear more similar to the car's layout, buttons and switches were respectively mounted on 3D-printed "side panels" or "cockpit panels," similar to those on the car. Attachments for the rotary switches were also printed to mimic the red GLV and TS master switches. All .stl files for the 3D-printed designs are uploaded and can be found in the CAD Assembly STL Files.zip file. The completed PCB Safety Loop/Shutdown Circuit education tool is shown below.

<p align="center">
<img width="1440" alt="Durfee Safety Loop 3D PCB Photo 2" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/6a42bba62a2f8f9efa6898e6a9f37e1c2906fa2f/3D%20Printed%20Layout.png">
</p>

After construction of the PCB, testing to check the functionality occured. Without having the proper relays in hand for the fault latching circuits, 5V relays from the 2022 ME480 Lab Rig were used. These created a significant voltage drop, causing the Safety Loop/Shutdown Circuit system to not work. Once this was bypassed, the ESSOK lights would ignite and work as intended. However, this resulted in the loss of functionality for the AMS Fault or IMD Fault buttons/features. Besides that, moving into the "high voltage" (9V) portion, I evaluated the AIRs. As seen in the wiring schematic, the Pre-Charge relay, AIR, and Discharge relay appear to be wired on the PCB incorrectly. Once corrected, by switching the connection from pad 5 to pad 2 on the Pre-Charge Relay, for example, these should work as intended. By sending the 9V+ directly after the start button, the motor and PWM Potentiometer "Motor Controller" was also tested. Despite the motor reciving approximately 9V, the motor was not spinning. Further testing to evaluate the "Motor Controller" and the pperability of the motor must occur to further find the respective issue. Below please find a photo of the first iteration of the PCB and the test rig.

<p align="center">
<img width="1440" alt="Test Rig" src="https://github.com/kdurf15/KDurf-Senior-Design-Project/blob/b357d4c6ce1ec5f3c1a9db8f2f3141de5c463b0f/TestRig.jpg">
</p>

If any issues or questions arise with the code/simulation/hardware/project, please feel free to contact me (Kevin/Durf) at kdurf15@comcast.net or durfeekd@lafayette.edu (if my Lafayette email address is still active).
