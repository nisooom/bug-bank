```bash
curl -X POST "http://localhost:3000/api/report" \
-H "X-Secret-Key: 014361375b67bb578b124e00b1f7538be9b31492f2cf1543f125374fa74ce26f" \
-H "Content-Type: application/json" \
-d '{"title":"My Report Title", "description":"This is a description of the report.", "reporteeEmail":"example@example.com", "images":null}'
```
