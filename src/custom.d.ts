type SvgrComponent = React.StatelessComponent<React.SVGAttributes<SVGElement>>;

declare module '*.svg' {
  const ReactComponent: SvgrComponent;

  export { ReactComponent };
}
