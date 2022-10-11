<template>
  <div class="window-height">
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :control-type="controlType"
      control-color="purple"
      navigation
      arrows
      class="window-height"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-banner rounded class="bg-purple-8 text-white full-width q-mb-sm">
          Mon, 28 Oktober 2022
        </q-banner>
        <q-markup-table :separator="separator" flat bordered class="no-margin full-height full-width">
          <thead>
            <tr>
              <th class="text-left">Product</th>
              <th class="text-right">Tags</th>
              <th class="text-right">Debit/Kredit</th>
              <th class="text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
                            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
                            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>
            <tr>
              <td class="text-left">Frozen Yogurt</td>
              <td class="text-right">Primary</td>
              <td class="text-right">D</td>
              <td class="text-right">24.000</td>
            </tr>

          </tbody>
        </q-markup-table>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center text-black">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
// carousel
import { ref } from 'vue'

export default {
  setup () {
    return {
      // carousel
      controlType: ref('outline'),
      controlTypeOptions: [
        { value: 'regular', label: 'regular' },
        { value: 'unelevated', label: 'unelevated' },
        { value: 'flat', label: 'flat (default)' },
        { value: 'outline', label: 'outline' },
        { value: 'push', label: 'push' }
      ],

      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
      // Table
      separator: ref('none')
    }
  }
}
</script>
