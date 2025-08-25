export const langField = {
    order: 1,
    name: 'lang',
    title: 'Language',
    type: 'string',
    options: {
        list: [
            { title: 'English', value: 'EN' },
            { title: 'عربي', value: 'AR' },
        ],
        layout: 'dropdown',
    },
    validation: (Rule: { required: () => any; }) => Rule.required(), // Optional: enforce selection
}