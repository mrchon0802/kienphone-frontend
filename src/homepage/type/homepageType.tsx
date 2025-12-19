export interface HomepageButton {
  label: string;
  link: string;
}

export interface HomepageType {
  _id?: string;
  title: string;
  description: string;
  image: string;
  buttons: HomepageButton[];
}
