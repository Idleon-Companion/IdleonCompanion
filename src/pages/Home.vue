<template>
  <div class="container">
    <div class="row justify-content-between pt-3">
      <div class="col-xs-9">
        <img
          class="img d-inline my-4 ml-4"
          style="height: 6rem"
          src="assets/bg/logo-clean.png"
        />
        <h1 class="display-4 d-sm-inline-block d-none align-middle ml-4">
          Idleon Companion
        </h1>
      </div>
      <div class="col-xs-3">
        <a
          type="button"
          class="btn btn-outline-light m-2"
          data-toggle="modal"
          data-target="#clockModal"
        >
          <p class="m-0 text-left"><small>Reset Timer</small></p>
          <h3 class="display-4 m-0" id="clock"></h3>
        </a>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="clockModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Configure Reset Timer
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-light">
              Insert the hours and minutes of your reset timer
            </p>
            <div class="input-group">
              <input
                class="form-control w-25"
                type="number"
                id="hours"
                min="0"
                max="24"
                placeholder="Hours"
              />
              <input
                class="form-control w-25"
                type="number"
                id="minutes"
                min="0"
                max="60"
                placeholder="Minutes"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onclick="saveOffset()"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="resetModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="resetModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resetModalLabel">It's a new day!</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-light">
              Your timer expired, would you like to reset your daily tasks?
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onclick="resetDailies()"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >
              Reset Dailies
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Nav -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="tab" href="#tasks">Tasks</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#checklist">Checklist</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#picnic-quest"
          >Picnic Quest</a
        >
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#builds">Builds</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#cards">Card Sets</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#characters">Characters</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="tab" href="#credits">Credits</a>
      </li>
    </ul>

    <div id="nav-tabContent" class="tab-content">
      <!--  TASKS  -->
      <div class="tab-pane fade active show" id="tasks"><Tasks /></div>
      <!-- checklist -->
      <div class="tab-pane fade" id="checklist"><ProgressTracker /></div>
      <div class="tab-pane fade" id="picnic-quest"><PicnicQuest /></div>
      <div class="tab-pane fade" id="builds"><Builds /></div>
      <div class="tab-pane fade p-3" id="cards"><Cards /></div>
      <div class="tab-pane fade p-3" id="characters"><Characters /></div>
      <div class="tab-pane fade" id="credits"><Credits /></div>
    </div>
  </div>
  <div class="footer m-5"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Builds from "../components/Builds.vue";
import Cards from "../components/Cards.vue";
import Credits from "../components/Credits.vue";
import PicnicQuest from "../components/PicnicQuest.vue";
import ProgressTracker from "../components/ProgressTracker.vue";
import Tasks from "../components/Tasks.vue";
import Characters from "../pages/Characters.vue";

export default defineComponent({
  name: "Home",
  components: {
    Builds,
    Cards,
    Characters,
    Credits,
    PicnicQuest,
    ProgressTracker,
    Tasks,
  },
});
</script>
