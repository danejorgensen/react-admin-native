import { UseDataProviderOptions } from '../types';

// List of properties we expect in the options
const OptionsProperties = [
    'action',
    'fetch',
    'meta',
    'onFailure',
    'onSuccess',
    'undoable',
    'mutationMode',
    'enabled',
];

const isDataProviderOptions = (value: any) => {
    if (typeof value === 'undefined') return [];
    let options = value as UseDataProviderOptions;

    return Object.keys(options).some(key => OptionsProperties.includes(key));
};

interface DataProviderCallArguments {
  resource: string;
  payload: any;
  options: UseDataProviderOptions;
  allArguments: any[];
}

// As all dataProvider methods do not have the same signature, we must differentiate
// standard methods which have the (resource, params, options) signature
// from the custom ones
export const getDataProviderCallArguments = (
  args: any[]
): DataProviderCallArguments => {
    const lastArg = args[args.length - 1];
    let allArguments: any[] = [...args];

    let resource: any;
    let payload: any;
    let options: UseDataProviderOptions = {};

    if (isDataProviderOptions(lastArg)) {
        options = lastArg as UseDataProviderOptions;
        allArguments = allArguments.slice(0, args.length - 1);
    }

    if (typeof allArguments[0] === 'string') {
        resource = allArguments[0];
        payload = allArguments[1];
    }

    return {
        resource,
        payload,
        options,
        allArguments,
    };
};
