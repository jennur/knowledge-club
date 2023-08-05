const categoryOptions = (selectedCategory) => [
    {
      name: "Engineering",
      icon: "screwdriver-wrench",
      click: () => {
        selectedCategory.value = {
          value: "engineering",
          name: "Engineering",
          icon: "screwdriver-wrench"
        }
      }
    },
    {
      name: "Mathematics",
      icon: "square-root-variable",
      click: () => {
        selectedCategory.value = {
          value: "mathematics",
          name: "Mathematics",
          icon: "square-root-variable"
        }
      }
    },
    {
      name: "Physics",
      icon: "atom",
      click: () => {
        selectedCategory.value = {
          value: "physics",
          name: "Physics",
          icon: "atom"
        }
      }
    },
    {
      name: "Chemistry",
      icon: "flask-vial",
      click: () => {
        selectedCategory.value = {
          value: "chemistry", 
          name: "Chemistry",
          icon: "flask-vial"
        }
      }
    },
    {
      name: "Biology",
      icon: "dna",
      click: () => {
        selectedCategory.value = {
          value: "biology",
          name: "Biology",
          icon: "dna"
        }
      }
    },
    {
      name: "Medicine",
      icon: "stethoscope",
      click: () => {
        selectedCategory.value = {
          value: "medicine",
          name: "Medicine",
          icon: "stethoscope"
        }
      }
    },
    {
      name: "Psychology",
      icon: "brain",
      click: () => {
        selectedCategory.value = {
          value: "psychology",
          name: "Psychology",
          icon: "brain"
        }
      }
    },
    {
      name: "Religion",
      icon: "hands-praying",
      click: () => {
        selectedCategory.value = {
          value: "religion",
          name: "Religion",
          icon: "hands-praying"
        }
      }
    },
  ];

export default categoryOptions;