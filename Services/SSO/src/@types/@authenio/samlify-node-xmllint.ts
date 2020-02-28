declare module '@authenio/samlify-node-xmllint' {
  interface ValidatorContext {
    validate?: (xml: string) => Promise<any>;
  }

  const validator: ValidatorContext;
  export default validator;
}
