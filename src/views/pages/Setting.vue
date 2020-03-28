<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" offset="3">
        <v-list two-line subheader>
          <v-subheader>General</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Profile photo</v-list-item-title>
              <v-list-item-subtitle>Change your Google+ profile photo</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Show your status</v-list-item-title>
              <v-list-item-subtitle>Your status is visible to everyone</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
          subheader
          two-line
          flat
        >
          <v-subheader>Hangout notifications</v-subheader>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {}
</script>
