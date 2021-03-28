 <?php
      $dir = "../../builds/";
      $array = array_slice(scandir($dir), 3);
      $i = 1;
			echo "<option value=\"0\" selected>Select Your Build</option>";
      foreach ($array as $value) {
        $string = file_get_contents($dir.$value);
        $title = json_decode($string, true);
        echo $title["title"];
        echo "<option name=\"".$value."\" value=\"".$i."\">".$title["title"]."</option>";
        $i ++;
      }
    ?>
