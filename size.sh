#!/usr/bin/env bash

max_size_kb=13 # (13 * 1024 / 1024) -- converted to kilobytes for simplicity

# Get the total size of the current directory in kilobytes, excluding .git and node_modules
total_size_kb=$(find . -type f -not -path '*/.git/*' -not -path '*/node_modules/*' -exec du -k {} + | awk '{s+=$1} END {print s}')

# Calculate percentage
percent=$(echo "scale=2; $total_size_kb / $max_size_kb * 100" | bc)

# Print the results
printf "%d KB (%.2f%%)\n" "$total_size_kb" "$percent"

