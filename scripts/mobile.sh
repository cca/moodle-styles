#!/usr/bin/env bash
if [ -n \"$NS\" ]; then
    POD=$(kubectl --namespace $NS get pods -l app.kubernetes.io/name=moodle -o custom-columns=name:.metadata.name | tail -n1)
    echo "Pushing mobile.css to $POD"
    kubectl --namespace $NS cp build/mobile.css $POD:/bitnami/moodle/theme/ccamobile
else
    echo 'no NS namespace env var, not pushing mobile.css to pod'
fi
