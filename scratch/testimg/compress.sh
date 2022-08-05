#!/bin/bash
#This script recursively simulates compression of jpg and png files to jpg files without significant loss in visual quality with "mozjpeg" (https://github.com/mozilla/mozjpeg) with 21 sets of parameters that were tested to produce the smallest files most of the time. Parameter set with the best results is then used to produce the smallest possible jpg files. This script asks whether the original files should be preserved or replaced with the compressed files. To make processing faster, rest of the compression simulations are skipped if the first simulation produces files that are larger than the original files. Thus, files compressed with this script are also always smaller than the original files.

#8 june 2021 v1
#mozjpeg-optimizer-v1.sh was written in 8 june 2021 and tested to be functional with mozjpeg v 4.0.4 on Debian 10. This script works with files/folders containing at least %, $, *, white spaces horizontal tabs or newlines. Parameters in this script include "-nojfif". This prevents JFIF write to the compressed jpg files and reduces their size by 18 bytes, but this breaks standards and may cause problems e.g. in some file viewers. "mozjpeg" command denoted in this script in mozjpeg v 4.0.4 is actually "cjpeg" unless a symbolic link after mozjpeg installation is created like so:
#sudo ln -s /opt/mozjpeg/bin/cjpeg /usr/bin/mozjpeg
#If no symbolic link is created, replace all instances of "mozjpeg" in this script to "cjpeg" to be able to use this script.

#COPYRIGHT: this script is made available under the Creative Commons CC0 1.0 Universal Public Domain Dedication (https://creativecommons.org/publicdomain/zero/1.0/deed.en). The original creator of this script has no affiliation with "mozjpeg" or "Mozilla".

printf "START:\t$(date)\n"
printf "Size in bytes:\norig.\tnow\t%% of orig.\tname and path (seconds spent processing) parameters used\n"

#Temp files to RAM as variables.
R0="$(mktemp -p /dev/shm/)"
R1="$(mktemp -p /dev/shm/)"
R2="$(mktemp -p /dev/shm/)"

while IFS= read -r -d '' i; do
	S=$(date +%s)
	#Filename and size saved. If the name has newlines or tabs, they are converted to spaces so the names display well on terminal.
	name="$(stat --printf="%n" "$i" | tr '\n' ' ' | tr '\t' ' ')"
	size="$(stat --printf="%s" "$i")"

	#Compression is simulated once. Compressed size in bytes are extracted and saved to a variable along with the used parameters.
	cjpeg -memdst -dct float -quant-table 1 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
	n=$(grep -oE "[0-9]+" "$R0"); printf "$n\t-dct float -quant-table 1 -nojfif -dc-scan-opt 2" > "$R1"

	#If compressed size is smaller than original size, then other parameters are skipped. Else: other parameters are tested.
	if(($size < $n)); then 
		printf '%s\n' "$size	----	skipped		$name"

	else
		cjpeg -memdst -dct float -quant-table 2 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -quant-table 2 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -quant-table 3 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -quant-table 3 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ms-ssim -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ms-ssim -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ms-ssim -quant-table 3 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ms-ssim -quant-table 3 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 0 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 0 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 1 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 1 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 2 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 2 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 1 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 1" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -dct float -tune-ssim -quant-table 4 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-dct float -tune-ssim -quant-table 4 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -quant-table 2 -nojfif -dc-scan-opt 1 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-quant-table 2 -nojfif -dc-scan-opt 1" >> "$R1"
		cjpeg -memdst -quant-table 2 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-quant-table 2 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -tune-ssim -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 1 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 1 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 2 -nojfif "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 2 -nojfif" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 2 -nojfif -dc-scan-opt 0 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 2 -nojfif -dc-scan-opt 0" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 2 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 2 -nojfif -dc-scan-opt 2" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 1 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 3 -nojfif -dc-scan-opt 1" >> "$R1"
		cjpeg -memdst -tune-ssim -quant-table 3 -nojfif -dc-scan-opt 2 "$i" > "$R0" 2>&1
		n=$(grep -oE "[0-9]+" "$R0"); printf "\n$n\t-tune-ssim -quant-table 3 -nojfif -dc-scan-opt 2" >> "$R1"

		#Smallest bytesize is found via sort from simulation info. Parameters used to obtain this size are extracted and used in mozjpeg to produce an actual compressed file.
		sort -n "$R1" > "$R2"
		par=$(head -n1 "$R2" | cut -f2)
		cjpeg $par "$i" > "$i.opti.jpg"

		#Time spent on processing and compressed vs original size in percentage are calculated and diplayed.
		size2=$(head -n1 "$R2" | cut -f1)
		percent=$((200*$size2/$size % 2 + 100*$size2/$size))
		E=`date +%s`
		T=$(("$E"-"$S"))
		printf '%s\n' "$size	$size2	$percent		$name ($T) $par"
	fi
#Finds recursively files with variable extensions. Add "-maxdepth 1" after "find" to search non-recursively. To compress e.g. png files only, remove "-iname '*.jpg' -o -iname '*.jpeg' -o".
done < <(find . -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)

#Temp files are removed from RAM.
rm -f "$R0" "$R1" "$R2"

printf "END:\t`date`\n"

read -r -p "Replace original jpg or png files with compressed .opti.jpg backups? Press Y for YES or N for NO and press ENTER. Note: compressed files are always smaller." response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
	find . -type f -name '*.opti.jpg' -exec bash -c 'mv "$1" "${1/%.opti.jpg/}"' -- {} \;
	printf "Done. Original files were replaced.\n"
else
	printf "Done. Original and compressed files were preserved. Compressed files have .opti.jpg suffix.\n"
fi

