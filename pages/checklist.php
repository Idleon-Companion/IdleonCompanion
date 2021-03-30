
<?php
  $dir = "./pages/data/checklist.json";
  $data = json_decode(file_get_contents($dir), true);
?>

<div class="col table-responsive px-0 mt-3">
  <table class="table text-center table-hover w-50 mx-auto" id="checklist" style="background-color: rgba(39, 43, 48,0.80);">
    <?php foreach($data as $key => $value): ?>
    <thead>
      <tr>
        <th class="table-info" colspan="8"><?php echo $key ?></th>
      </tr>
      <tr>
        <th scope="col">Character</th>
        <th scope="col">1</th>
        <th scope="col">2</th>
        <th scope="col">3</th>
        <th scope="col">4</th>
        <th scope="col">5</th>
        <th scope="col">6</th>
        <th scope="col">7</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach($value as $innerKey => $innerValue): ?>
      <tr>
        <th data-toggle="tooltip" data-trigger="click" data-delay='{"show":"100", "hide":"100"}' title="<?php echo $innerValue["name"] ?>" scope="row" class="p-0">
          <img class="w-50 h-auto" loading="lazy" src="assets/images/checklist/<?php echo $innerKey ?>.png">
        </th>
          <?php if($innerValue['global'] == "true"): ?>
          <td colspan="7">
            <div class="custom-control custom-checkbox">
              <input class="custom-control-input" type="checkbox" id="check-<?php echo $innerKey ?>" >
              <label class="custom-control-label" for="check-<?php echo $innerKey ?>"></label>
            </div>
          </td>
        <?php else: ?>
          <?php for($i=1 ; $i<8 ; $i++ ): ?>
          <td>
            <div class="custom-control custom-checkbox">
              <input class="custom-control-input" type="checkbox" id="check-<?php echo $innerKey."-".$i ?>" >
              <label class="custom-control-label" for="check-<?php echo $innerKey."-".$i ?>"></label>
            </div>
          </td>
        <?php endfor ?>
      <?php endif ?>
        </tr>
      <?php endforeach ?>
    </tbody>
    <?php endforeach ?>
  </table>
</div>
