import categories from "@/config/categories.json";

const categoryOptions = (selectedCategory) => {
  return {
    default: {
      text: selectedCategory.value?.name || 'Category',
      icon: selectedCategory.value?.icon || 'box-open'
    },
    options: [
      {
        ...categories["engineering"],
        click: () => {
          selectedCategory.value = {
            ...categories["engineering"]
          }
        }
      },
      {
        ...categories["mathematics"],
        click: () => {
          selectedCategory.value = {
            ...categories["mathematics"]
          }
        }
      },
      {
        ...categories["physics"],
        click: () => {
          selectedCategory.value = {
            ...categories["physics"]
          }
        }
      },
      {
        ...categories["chemistry"],
        click: () => {
          selectedCategory.value = {
            ...categories["chemistry"]
          }
        }
      },
      {
        ...categories["biology"],
        click: () => {
          selectedCategory.value = {
            ...categories["biology"]
          }
        }
      },
      {
        ...categories["medicine"],
        click: () => {
          selectedCategory.value = {
            ...categories["medicine"]
          }
        }
      },
      {
        ...categories["psychology"],
        click: () => {
          selectedCategory.value = {
            ...categories["psychology"]
          }
        }
      },
      {
        ...categories["religion"],
        click: () => {
          selectedCategory.value = {
            ...categories["religion"]
          }
        }
      },
    ]
  }
};

export default categoryOptions;