#!/usr/bin/env bash
SETTING="$1"
FILE="$2"

# requires a NS k8s namespace var
if [[ $NS != 'moo-stg1' && $NS != 'moo-prod' ]]; then
    echo "ERROR: requires an NS namespace env var matching either the production or staging namespace"
    exit 1
fi
if [[ -n $SETTING && -f $FILE ]]; then
    POD=$(kubectl --namespace "$NS" get pods -l app.kubernetes.io/name=moodle -o name)
    echo "Setting $SETTING on $POD to the contents of file $FILE"
    kubectl --namespace "$NS" exec "$POD" -- php /bitnami/moodle/admin/cli/cfg.php --name="$SETTING" --set="$(cat "$FILE")"
else
    echo "ERROR: first argument must be a Moodle core setting string and second must be a file whose contents are the value of that setting."
fi
