<script>
  import { createEventDispatcher } from "svelte";
  import { slide, fade, fly } from "svelte/transition";
  import Card from "../Card/Card.svelte";
  import TextField from "../TextField";
  import Picker from "./Picker.svelte";
  import Menu from "../Menu";
  import Button from "../Button";
  import Ripple from "../Ripple";
  import { getWeekDays, weekStart } from "./util";

  const dispatch = createEventDispatcher();
  const noop = i => i;

  export let label = "Date";
  export let open = false;
  export let defaultIcon = "date_range";
  export let value = null;
  export let locale = "default";
  export let todayClasses = "text-primary-600 rounded-full border border-primary-600";
  export let selectedClasses = "bg-primary-600 text-white rounded-full";
  export let closeOnSelect = true;
  export let appendClasses = noop;
  export let dense = false;

  let hasUserValue = Boolean(value);

  const today = (new Date()).getDate();

  let selected;
  let displayValue = value && value.toLocaleDateString
    ? value.toLocaleDateString()
    : "";

  function valid(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  function changeTextInput(e) {
    const date = new Date(e.target.value);

    if (valid(date)) {
      value = date;
    }

    if (e.target.value === '') {
      value = null;
    }
  }

  $: if (dense) {
    appendClasses = (i) => i.replace('pt-4', 'pt-3');
  }
</script>

<Menu bind:open>
  <div slot="activator">
    <TextField
      classes={i => i.replace('mb-6', '')}
      value={displayValue}
      {label}
      {dense}
      append={defaultIcon}
      {appendClasses}
      on:click-append={() => open = !open}
      on:change={changeTextInput}
    />
  </div>
  <div slot="menu">
    {#if open}
      <Picker
        bind:value
        bind:open
        {dense}
        {locale}
        {todayClasses}
        {selected}
        {selectedClasses}
        {closeOnSelect}
        on:change
        on:change={e => {
          displayValue = e.detail.toLocaleDateString();
        }}
      />
    {/if}
  </div>
</Menu>
