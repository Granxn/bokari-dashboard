<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules

- The Bokari dashboard UI lives in `src/components/bokari/*`; its sample data is centralized in `src/lib/mock-data.ts` — never inline mock figures inside chart components.
- Chart and status colors come from semantic tokens (`--chart-1..5`, `--success`, `--danger`) defined in `src/styles.css`; never hardcode hex values in components. The app is dark-only: values live on `:root`.
