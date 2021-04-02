<template>
  <div class="container pt-3">
    <div class="row justify-content-between mb-5">
      <div class="col-8 align-items-center">
        <div id="logo" class="display-4 text-light">Idleon Companion</div>
      </div>
      <div class="col-4">
        <CharacterSelector />
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
    <ul class="nav nav-tabs nav-dark" role="tablist">
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#tasks" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Tasks</button>
			</li>
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#checklist" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Checklist</button>
			</li>
      <li class="nav-item">
        <button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#statues" type="button"
        role="tab" aria-controls="profile" aria-selected="false">Statues</button>
      </li>
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#picnic-quest" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Picnic Quest</button>
			</li>
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#builds" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Builds</button>
			</li>
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#cards" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Card Sets</button>
			</li>
      <li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#characters" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Characters</button>
			</li>
			<li class="nav-item">
				<button class="nav-link text-light" 
        data-bs-toggle="tab" data-bs-target="#credits" type="button" 
        role="tab" aria-controls="profile" aria-selected="false">Credits</button>
			</li>
		</ul>

    <div id="nav-tabContent" class="tab-content">
      <div class="tab-pane fade active show" id="tasks"><Tasks /></div>
      <div class="tab-pane fade jumbotron" id="checklist"><ProgressTracker /></div>
      <div class="tab-pane fade" id="statues"><Statues /></div>
      <div class="tab-pane fade jumbotron" id="picnic-quest"><PicnicQuest /></div>
      <div class="tab-pane fade jumbotron" id="builds"><Builds /></div>
      <div class="tab-pane fade jumbotron" id="cards"><Cards /></div>
      <div class="tab-pane fade jumbotron" id="characters"><Characters /></div>
      <div class="tab-pane fade jumbotron" id="credits"><Credits /></div>
    </div>
  </div>
  <div class="footer m-5"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Builds from "../components/Builds.vue";
import Cards from "../components/Cards.vue";
import Credits from "../components/Credits.vue";
import CharacterSelector from "../components/CharacterSelector.vue";
import PicnicQuest from "../components/PicnicQuest.vue";
import ProgressTracker from "../components/ProgressTracker.vue";
import Statues from "../components/Statues.vue";
import Tasks from "../components/Tasks.vue";
import Characters from "../pages/Characters.vue";

export default defineComponent({
  name: "Home",
  components: {
    Builds,
    Cards,
    Characters,
    CharacterSelector,
    Credits,
    PicnicQuest,
    ProgressTracker,
    Statues,
    Tasks,
  },
});
</script>
