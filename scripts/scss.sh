#!/usr/bin/env bash
FILE="$1"

# requires a NS k8s namespace var
if [[ $NS != 'moo-stg1' && $NS != 'moo-prod' ]]; then
    echo "ERROR: requires an NS namespace env var matching either the production or staging namespace"
    exit 1
fi
if [[ -f $FILE ]]; then
    POD=$(kubectl --namespace "$NS" get pods -l app.kubernetes.io/name=moodle -o name)
    echo "Setting theme_boost scss on $POD to the contents of file $FILE"
    kubectl --namespace "$NS" exec "$POD" -- php /bitnami/moodle/admin/cli/cfg.php --component="theme_boost" --name="scss" --set="$(cat "$FILE")"
    # rebuild theme CSS, this happens automatically when you update via UI but not for cfg.php
    kubectl --namespace "$NS" exec "$POD" -- php /bitnami/moodle/admin/cli/build_theme_css.php --themes=boost
else
    echo "ERROR: argument must be a SCSS file"
fi
