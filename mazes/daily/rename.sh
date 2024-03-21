#!/bin/bash
DAY=$(date -d "+1 day" +%F)
INDEX=0
for FILE in *.txt
 do
  DAY=$(date -d "+$INDEX day" +%F)
  echo "Renaming $FILE to $DAY"
  cp "$FILE" "$DAY.txt"
  ((INDEX++))
 done