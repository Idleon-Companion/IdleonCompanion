<div class="jumbotron">
  <div class="row pl-3 mb-4">
    <div class="form-group">
      <select class="custom-select" id="buildSelector">
        <option value="0" selected>Select Your Build</option>
      </select>
    </div>
  </div>
  <!--  TALENTS  -->
  <div class="row justify-content-center" id="buildContent">
    <div class="col-xl-4" style="max-width:400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 1</div>
        <div class="card-body talent-container p-2" id="skill_tab_one">
          <?php for( $i = 1; $i < 16; $i++ ): ?>
            <div class="bs-component disabled">
              <img src="assets/images/talents/empty.png" class="img-fuid img-thumbnail" />
              <p class="text-light text-center bg-secondary border rounded skill m-0"></p>
            </div>
          <?php endfor ?>
        </div>
        <div class="card-body border border-secondary rounded">
          <p id="notes_one" class="card-text"></p>
        </div>
      </div>
    </div>
    <div class="col-xl-4" style="max-width:400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 2</div>
        <div class="card-body talent-container p-2" id="skill_tab_one">
          <?php for( $i = 1; $i < 16; $i++ ): ?>
            <div class="bs-component disabled">
              <img src="assets/images/talents/empty.png" class="img-fuid img-thumbnail" />
              <p class="text-light text-center bg-secondary border rounded skill m-0"></p>
            </div>
          <?php endfor ?>
        </div>
        <div class="card-body border border-secondary rounded">
          <p id="notes_one" class="card-text"></p>
        </div>
      </div>
    </div>
    <div class="col-xl-4" style="max-width:400px">
      <div class="card border-primary mb-2">
        <div class="card-header">Tab 3</div>
        <div class="card-body talent-container p-2" id="skill_tab_one">
          <?php for( $i = 1; $i < 16; $i++ ): ?>
            <div class="bs-component disabled">
              <img src="assets/images/talents/empty.png" class="img-fuid img-thumbnail" />
              <p class="text-light text-center bg-secondary border rounded skill m-0"></p>
            </div>
          <?php endfor ?>
        </div>
        <div class="card-body border border-secondary rounded">
          <p id="notes_one" class="card-text"></p>
        </div>
      </div>
    </div>

  </div>
  <!--- NOTES --->
  <div class="row">
    <div class="col-xl-12 mt-4">
      <div class="card border-light">
        <div class="card-body">
          <p class="card-text" id="notes"></p>
        </div>
      </div>
    </div>
  </div>
</div>
