Draft 2022-12-04

# Migrating Create-React-App to Esbuild

### Issues encountered

- `"target": "es5"` has poor support in esbuild - read, doesn't actually transpile most es6+ features to es5;
- need loaders for `.woff`, `.woff2`, and `.svg` - use file for all of them;
- `react-scripts build` prints the file size after gzip - took me a couple minutes to realize that the esbuild bundle is not actually 3x larger;
- global=window;
- env variables - but only those prefixed with `REACT_APP_` and as individual definitions;
- manual index.html interpolation - the global path variable isn't actually very variable;
- when using `react-router`, `esbuild serve` needs a proxy server to redirect requests to `/random/url/paths.html` to `index.html`.
