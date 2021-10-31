<template>
  <q-card class="m-4 md:(mx-auto w-1/2)">
    <q-card-section>
      <div class="text-lg text-negative">
        WARNING: This will overwrite your current Idleon Companion data!
      </div>
      <div class="text-secondary">
        This tool is in beta and may not work as expected. It is recommended to
        save to cloud before importing game data. In order to use this tool, use
        one of the third-party tools to extract your data from the game. Use
        these tools at your own risk!
      </div>
      <a
        class="text-info font-medium"
        href="https://github.com/desophos/idleon-saver/releases"
        >Idleon Saver (Steam - Windows Only)</a
      >
    </q-card-section>
    <q-card-section>
      <div class="text-xl">Upload Data</div>
      <div class="text-secondary">
        After you obtain a data file, you can either upload it here or paste the
        contents below. Note that sharing this data will allow others to see
        your game data.
      </div>
      <q-file
        v-model="jsonFile"
        bottom-slots
        counter
        filled
        accept=".json"
        label="Idleon Data"
        class="my-2"
      >
        <template v-slot:prepend>
          <q-icon name="cloud_upload" @click.stop />
        </template>
        <template v-slot:append>
          <q-icon
            name="close"
            @click.stop="jsonFile = null"
            class="cursor-pointer"
          />
        </template>

        <template v-slot:hint>Upload a .json file above</template>
      </q-file>
      <q-separator />
      <q-input
        type="textarea"
        v-model="jsonText"
        label="Alternative: Paste Data"
        hint="Paste your game data above"
      />
    </q-card-section>
    <q-card-section>
      <div class="m-2">
        <q-btn unelevated color="info" @click="onUploadData">Import</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  updateStateFromImportData,
  validateImportData,
} from "~/utils/ApiImport";
import { useToast } from "vue-toastification";

export default defineComponent({
  name: "Import",
  setup() {
    const toast = useToast();

    const jsonFile = ref<Blob | null>(null);
    const jsonText = ref("");

    const onUploadData = () => {
      if (!jsonFile.value && !jsonText.value) {
        toast.warning("You must submit a JSON file/text to upload data.");
        return;
      }
      let importData;
      if (jsonFile.value) {
        let reader = new FileReader();
        reader.readAsText(jsonFile.value, "UTF-8");
        reader.onload = (evt) => {
          const blob = evt.target?.result?.toString();
          if (!blob) {
            toast.error("Error while parsing JSON data.");
            return;
          }
          importData = JSON.parse(blob);
          const valid = validateImportData(importData);
          if (!valid || !importData) {
            console.log("!valid:", !valid, !importData);
            toast.error(
              "Your data is either not formatted correctly or is outdated. Check that the version of the data is supported!"
            );
            return;
          }
          updateStateFromImportData(importData);
          toast.success("Successfully imported data to Idleon Companion!");
        };
        reader.onerror = (_) => {
          toast.error("Failed to parse JSON data.");
        };
      } else if (jsonText.value) {
        try {
          importData = JSON.parse(jsonText.value);
        } catch (_) {
          toast.error("Failed to parse JSON data.");
          return;
        }
        const valid = validateImportData(importData);
        if (!valid || !importData) {
          console.log("!valid:", !valid, !importData);
          toast.error(
            "Your data is either not formatted correctly or is outdated. Check that the version of the data is supported!"
          );
          return;
        }
        updateStateFromImportData(importData);
        toast.success("Successfully imported data to Idleon Companion!");
      }
    };

    return {
      jsonFile,
      jsonText,
      validateImportData,
      onUploadData,
    };
  },
});
</script>

<style scoped lang="sass"></style>
