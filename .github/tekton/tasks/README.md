## Apply tekton tasks
In case of any changes to task definitions those have to be manually applied to Devops build cluster.

```bash
kubectl apply -f build-prod.yaml -f lint.yaml -f test.yaml
```
