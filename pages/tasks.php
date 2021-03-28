<?php
  $dir = "./pages/data/tasks.json";
  $data = json_decode(file_get_contents($dir), true);
?>

<?php
        $daily = $data['daily'];
        $three = $data['three'];
        $weekly = $data['weekly'];
?>

<div class="row">
  <div class="col-lg-12 mt-3">
    <div class="bs-component">
      <div class="progress">
        <div id="progress" class="progress-bar bg-success" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-12">
    <div class="bs-component">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-3">Daily</h5>
            <p class="bs-component">
              <button id="btnCheck" type="button" class="btn btn-primary btn-lg btn-block">Check All</button>
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="col-lg-12">
    <div class="list-group checkbox-container" id="dailyGroup">
      <?php foreach($daily as $key => $value): ?>
      <label for="<?php echo $key ?>" class="list-group-item list-group-item-action active mb-0">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="<?php echo $key ?>" unchecked>
          <p class="custom-control-label">
            <?php echo $value ?>
          </p>
        </div>
      </label>
      <?php endforeach ?>
      <label for="daily8" class="list-group-item list-group-item-action active mb-0">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="daily8" unchecked>
          <p class="custom-control-label">
            Kill Boops (in the secret area) and Dr Defecaus if possible
            <span class="badge badge-info mx-4" id="boopsBadge">  0:00  </span>
          </p>
        </div>
      </label>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-12">
    <div class="bs-component">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-3">Every Three Days</h5>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="col-lg-12">
    <div class="list-group checkbox-container">
      <?php foreach($three as $key => $value): ?>
      <label for="<?php echo $key ?>" class="list-group-item list-group-item-action active mb-0">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="<?php echo $key ?>" unchecked>
          <p class="custom-control-label">
            <?php echo $value ?>
          </p>
        </div>
      </label>
      <?php endforeach ?>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-lg-12">
    <div class="bs-component">
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start active">
          <div class="d-flex w-100 justify-content-between">
            <h3 class="mb-3">Weekly</h5>
          </div>
        </a>
      </div>
    </div>
  </div>
  <div class="col-lg-12">
    <div class="list-group checkbox-container">
      <?php foreach($weekly as $key => $value): ?>
      <label for="<?php echo $key ?>" class="list-group-item list-group-item-action active mb-0">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="<?php echo $key ?>" unchecked>
          <p class="custom-control-label">
            <?php echo $value ?>
          </p>
        </div>
      </label>
      <?php endforeach ?>
    </div>
  </div>
</div>
