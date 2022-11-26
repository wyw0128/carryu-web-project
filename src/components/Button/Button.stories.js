import Button from "./Button";
// YourComponent.stories.js|jsx

//👇 This default export determines where your story goes in the story list
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Button",
  component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  color: "#fff",
  backgroundColor: "#000",
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  //👇 The args you need here will depend on your component
  label: "Button",
  backgroundColor: "#fff",
  color: "#000",
};
