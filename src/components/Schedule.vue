<template>
    <div v-if="loaded" id="scheduleComponent" :class="{ togglezindexbelow: signintoggle && authenticated !== 'authenticated' }">
      <h1>Holy Rosary Edmonds</h1>
    <h2>Eucharistic Minister Schedule</h2>
    <hr>
    <h3 v-if="schedules.length === 0" style="margin-top:20px">No schedules are currently posted.</h3>
    <!-- Start of the display created schedule section -->
    <!-- <div v-for="schedule in schedules" :key="schedule.id" class="month-schedule" :class="{ outlineonhover: authenticated === 'authenticated' }"> -->
    <div v-for="schedule in schedules" :key="schedule.id" class="month-schedule">
  
      <h3 style="margin-top: 10px">
        {{ schedule.month }}, {{ schedule.year }}
      </h3>
      
      <div v-for="mass in schedule.masses" :key="mass.id" style="">

        <div v-if="mass['days']">

          <div class="row mass-time">
            {{mass.time}} Mass
          </div>
          
          <div v-for="day in mass.days" :key="day.id" style="padding: 10px;">
            <!-- Display for each specific Mass day -->
          
            <div class="row day">

              <div class="col" style="margin-right:20px;justify-content:center">
                Date: {{ day.date }}
              </div>

              <div class="col">
                <div class="row" style="flex-wrap: wrap;">
                  <p  class="bread-minister-name" style="margin-right:5px">
                    Body of Christ:
                  </p>
                  <!-- <div v-for="(body, index) in day.breadMinisters" :key="body.id">
                    <p><span v-if="index != 0">, </span> {{ body.name }}  </p>
                  </div> -->

                  <div class="bread-minister-name" v-for="(body) in day.breadMinisters" :key="body.id">
                    <p >{{ body.name }}</p>
                  </div>
                </div>

                <div class="row">
                  <p class="cup-minister-name" style="margin-right:5px" >
                    Precious Blood: 
                  </p>
                  <!-- <div v-for="(blood, index) in day.cupMinisters" :key="blood.id">
                    <p><span v-if="index != 0">, </span>{{ blood.name }}</p>
                  </div> -->

                  <div class="cup-minister-name" v-for="(blood) in day.cupMinisters" :key="blood.id">
                    <p >{{ blood.name }}</p>
                  </div>
                </div>

              </div>  

            </div>

          <!-- End of day in mass.days section -->
          </div>

          <hr>

        </div>

      <!-- End of mass in schedule.masses section -->
      </div>
      
      <button v-if="authenticated === 'authenticated'" @click="deleteSchedule(schedule)" >X</button>
    <!-- End of schedule in schedules section -->
    </div>

    <!-- Start of the create new schedule section -->
    <div v-for="schedule in vmschedules" :key="schedule.id" class="mb-20" style="border:solid gray;border-radius:10px;margin-top:20px;">

      <h3 style="margin:20px;font-weight:600">Mass schedule builder</h3>
      <div class="row" style="margin:20px">
        <select v-model="schedule.month" style="margin-right:10px">
          <option disabled value="">Month</option>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
        <p>{{schedule.year}}</p>
      </div>
      
      <div v-for="mass in schedule.masses" :key="mass.id" class="col" style="margin:20px"> 

        {{mass.time}} Mass
        <div v-for="day in mass.days" :key="day.id" style="background:rgba(244, 244, 244, 0.1);margin-bottom:10px"> 

          <!-- Display for each specific Mass day -->
          <div class="col mb-20" style="">

            <div class="row">

              <div class="col" style="margin-right:10px;justify-content:center">
              {{ day.date }}
              </div>

              <div class="col">
                <div class="row">
                  <p style="margin-right:5px">
                    Body of Christ:
                  </p>
                  <div v-for="(body, index) in day.breadMinisters" :key="body.id">
                    <p><span v-if="index != 0">, </span> {{ body.name }}  </p>
                  </div>
                </div>

                <div class="row">
                  <p style="margin-right:5px">
                    Precious Cup: 
                  </p>
                  <div v-for="(blood, index) in day.cupMinisters" :key="blood.id">
                    <p><span v-if="index != 0">, </span>{{ blood.name }}</p>
                  </div>
                </div>
              </div>  

            </div>

          </div>
         
          <div class="row mb-20" style="justify-content:space-around;">

            <div class="col">
              
              <input
                type="text"
                placeholder="Bread Minister name"
                class=""
                v-model="breadminister"
              />
              
              <button v-on:click="addMinister(mass.time, day.date, 'bread', breadminister)">Add Bread minister</button>

            </div>

            <div class="col">

              <input
              type="text"
              placeholder="Cup Minister name"
              v-model="cupminister"
              />

              <button v-on:click="addMinister(mass.time, day.date, 'cup', cupminister)">Add Cup minister</button>

            </div>

          </div>

        </div>

         <!-- Add day input and button -->
        <div style="width:50%">
          <input
              type="text"
              placeholder="Date"
              v-model="daydate"
              />
          <button v-on:click="addDay(mass.time, daydate)" style="margin-top:5px">Add day</button>
        </div>
          
      </div>

      <div style="margin:20px">
        <button v-on:click="cancelCreateSchedule()" style="margin-right:20px">Cancel</button>
        <button v-on:click="createSchedule()">Save schedule</button>
      </div>
     
  </div>

  <button class="add-schedule-button" v-if="vmschedules.length == 0 && authenticated === 'authenticated'" v-on:click="addSchedule">Create new schedule</button>

    </div>

    <div v-else class="loader"></div>
</template>

<script>
  import { API } from 'aws-amplify';
  import { createSchedule } from '../graphql/mutations';
  import { deleteSchedule } from '../graphql/mutations';
  import { getSchedule, listSchedules } from '../graphql/queries';
  import { onCreateSchedule } from '../graphql/subscriptions';
  import { uuid } from 'vue-uuid';

  export default {
    name: 'App',
    props: ['authenticated', 'signintoggle'],
    async created() {
      this.getSchedules();
      this.subscribe();
    },
    data() {
      return {
        schedules: [],
        vmschedules: [],
        loaded: false
      };
    },
    watch: {
        //Add a handler named after the prop defined on this Vue instance you want to watch
        authenticated(newValue, oldValue) {
            // watch handlers are always passed newValue and oldValue as params.
            if (newValue !== 'authenticated') {
                this.vmschedules.pop();
            } 
        }
    },
    methods: {
        testcreateSchedule(){
  
        console.log("testcreateSchedule method called");
        
      },
      async createSchedule() {
        const vmschedule = this.vmschedules[0];
        const vmmasses = this.vmschedules[0].masses;
        
        const result = await API.graphql({
          query: createSchedule,
          variables: { input: vmschedule }
        });

        const schedule = result.data.createSchedule;
        console.log(schedule);
      },
      async deleteSchedule(item) {

        const id = item.id;
        const schedule = { id };

        const index = this.schedules.map(function(e) { return e.id; }).indexOf(item.id);
        this.schedules.splice(index, 1);

        await API.graphql({
          query: deleteSchedule,
          variables: { input: schedule }
        });
        
      },
      async getSchedules() {
        const schedules = await API.graphql({
          query: listSchedules,
        });
        this.schedules = schedules.data.listSchedules.items.sort(function(a,b){
              return new Date(a.createdAt) - new Date(b.createdAt);
        });
        this.loaded = true;
      },
      addSchedule() {
        this.vmschedules.push({
          month: "",
          year: new Date().getFullYear(),
          masses: [
            {
              id: uuid.v4(),
              time: "5:00pm",
            },
            {
              id: uuid.v4(),
              time: "8:30am",
            },
            {
              id: uuid.v4(),
              time: "10:30am",
            }
          ]
      });
      },
      addMinister(time, date, ministerType, minister) {
      
        const massIndex = this.vmschedules[0].masses.findIndex(checkMassTime);
        const mass = this.vmschedules[0].masses[massIndex];

        const dayIndex = mass.days.findIndex(checkDate);
        const day = mass.days[dayIndex];
       
        if(ministerType == "bread") {
          day.breadMinisters.push({id: uuid.v4(), name: minister});
        }
        else if (ministerType == "cup") {
          day.cupMinisters.push({id: uuid.v4(), name: minister});
        }

        //helper function
        function checkMassTime(mass) {
          return mass.time === time;
        };

        //helper function
        function checkDate(day) {
          return day.date === date;
        };

        this.breadminister = "";
        this.cupminister = "";

      },
      addDay(massTime, dayDate) {

        const massIndex = this.vmschedules[0].masses.findIndex(checkMassTime);
        const mass = this.vmschedules[0].masses[massIndex];

        if(mass.days == null) {
          mass.days = [];
        }
        
        mass.days.push(
          {
            id: uuid.v4(),
            date: dayDate,
            breadMinisters: [],
            cupMinisters: []
          }
        );

        this.daydate = "";
        
        //helper function
        function checkMassTime(mass) {
          return mass.time === massTime;
        };

      },
      removeDay() {

      },
      cancelCreateSchedule() {
        this.vmschedules.pop()
      },
      subscribe() {
        API.graphql({ query: onCreateSchedule }).subscribe({
          next: (eventData) => {
            let schedule = eventData.value.data.onCreateSchedule;
            if (this.schedules.some((item) => item.name === schedule.name)) return; // remove duplications
            this.schedules = [...this.schedules, schedule];
          }
        });
      },
    }
  };
</script>