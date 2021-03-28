
<?php
  $dir = "./pages/data/card-sets.json";
  $data = json_decode(file_get_contents($dir), true);
?>

<?php foreach($data as $value): ?>

<?php
        $title = $value['title'];
        $array1 = $value['core'];
        $array2 = $value['useful'];
        $array3 = $value['minimal'];
?>

  <div class="h1"><?php echo $title ?></div>
  <div class="row justify-content-left p-3">
      <div class="bs-component border border-secondary rounded p-2" style="min-width:150px">
        <span class="badge badge-pill badge-primary card-title px-4 py-1">Core Cards</span>
        <?php
              foreach ($array1 as $value)
                echo "<img src=\"assets/images/cards/".$value."_Card.png \" title=\"".$value."\" class=\"img-fluid card-set\"/>";
        ?>
      </div>
      <div class="bs-component border border-secondary rounded p-2" style="min-width:150px" >
        <span class="badge badge-pill badge-primary card-title px-4 py-1">Helpful Cards</span>
        <?php
              foreach ($array2 as $value)
                echo "<img src=\"assets/images/cards/".$value."_Card.png \" title=\"".$value."\" class=\"img-fluid card-set\" />";
        ?>
      </div>
      <div class="bs-component border border-secondary rounded p-2 <?php if (!count($array3)){echo "invisible";}; ?>" style="min-width:150px">
        <span class="badge badge-pill badge-primary card-title px-4 py-1">Minimal Benefits</span>
        <?php
              foreach ($array3 as $value)
                echo "<img src=\"assets/images/cards/".$value."_Card.png \" title=\"".$value."\" class=\"img-fluid card-set\" />";
        ?>
      </div>
    </div>

  <?php endforeach ?>
